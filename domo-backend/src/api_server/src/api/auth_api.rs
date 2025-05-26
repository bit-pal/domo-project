use chrono::Utc;

use actix_web::{post, web, HttpResponse, Responder, error::Error as ActixError};
use game_core::logic::base_logic::find_or_create_base;
use uuid::Uuid;
use sqlx::{PgPool};
use crate::models::{JwtClaims, LoginRequest, LoginResponse};
use crate::domo_config::Settings;
use crate::response_wrapper::{internal_error, response_ok, unauthorized};
use jsonwebtoken::{encode, Header, EncodingKey};
use crate::models::{NonceRequest, NonceResponse};
use crate::utils::{apply_referral_code, commit_tx, start_tx, verify_offchain_signature, JWT_EXPIRE, NONCE_LIVETIME};

use game_core::logic::boss_logic::find_or_create_boss;

#[post("/auth/nonce")]
async fn get_nonce(
	pool: web::Data<PgPool>,
	req: web::Json<NonceRequest>,
) -> impl Responder {
	let nonce = Uuid::new_v4().to_string();
	let result = start_tx(pool.get_ref()).await;

	if let Err(e) = result {
		log::error!("Error start tx: {:?}", e);
		return internal_error("Internal error auth nonce");
	}

	let mut tx = result.unwrap();

	let result =  
		sqlx::query(
			r#"
			INSERT INTO nonces (wallet, nonce, expires_at) 
			VALUES ($1, $2, NOW() + ($3::text || ' minutes')::INTERVAL) 
			ON CONFLICT (wallet) 
			DO UPDATE SET 
				nonce = EXCLUDED.nonce,
				expires_at = EXCLUDED.expires_at
			"#
		)
		.bind(&req.wallet)
		.bind(&nonce)
		.bind(*NONCE_LIVETIME)
		.execute(&mut *tx)
		.await;

	if let Err(e) = result {
		log::error!("DB error nonces: {:?}", e);
		return internal_error("Internal error db insert auth nonce");
	}

	let result =commit_tx(tx).await;

	if let Err(e) = result {
		log::error!("Error commit tx: {:?}", e);
		return internal_error("Internal error db commit auth nonce");
	}
	
	response_ok(NonceResponse { nonce })
}

#[post("/auth/login")]
async fn login(
	pool: web::Data<PgPool>,
	req: web::Json<LoginRequest>,
	settings: web::Data<Settings>,
) -> Result<HttpResponse, ActixError> {
	let mut tx = start_tx(pool.get_ref())
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

	let record = sqlx::query!(
		"SELECT nonce, expires_at FROM nonces WHERE wallet = $1 AND expires_at > NOW()",
		&req.wallet
	)
	.fetch_optional(pool.get_ref())
	.await
	.map_err(actix_web::error::ErrorInternalServerError)?;

	let nonce_record = match record {
		Some(row) => row,
		None => return Ok(unauthorized("Invalid wallet")),
	};

	if verify_offchain_signature(&req.wallet, &req.signature, &nonce_record.nonce).is_err() {
		return Ok(unauthorized("Invalid signature verify"));
	}

	// Update no need, it just mock, only for trick with RETURNING id
	let user_row = sqlx::query!(
		r#"
		INSERT INTO users (id, wallet)
		VALUES (gen_random_uuid(), $1)
		ON CONFLICT (wallet) DO UPDATE  
			SET wallet = EXCLUDED.wallet
		RETURNING id
		"#,
		&req.wallet
	)
	.fetch_one(&mut *tx)
	.await
	.map_err(actix_web::error::ErrorInternalServerError)?;

	let boss = find_or_create_boss(&mut tx, user_row.id)
	.await
	.map_err(actix_web::error::ErrorInternalServerError)?;

	let base = find_or_create_base(&mut tx, boss.id)
	.await
	.map_err(actix_web::error::ErrorInternalServerError)?;

	let jwt_expire = (Utc::now().timestamp() + JWT_EXPIRE) as usize;
	let claims = JwtClaims { 
		user_id: user_row.id.to_string(),
		boss_id: boss.id.to_string(),
		base_id: base.id.to_string(),
		exp: jwt_expire
	};
	
	let token = encode(
		&Header::default(),
		&claims,
		&EncodingKey::from_secret(settings.jwt_secret.as_bytes()),
	).map_err(actix_web::error::ErrorInternalServerError)?;

	if let Some(referral_code) = &req.referrer {
		apply_referral_code(referral_code.to_owned(), &mut tx, req.wallet.to_owned())
		.await
		.map_err(|err| actix_web::error::ErrorInternalServerError(format!("{err}")))?;
	}

	commit_tx(tx)
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

	Ok(response_ok(LoginResponse {
		jwt: token,
		expires_at: jwt_expire as i64
	}))
}
