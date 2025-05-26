use actix_web::{error::Error as ActixError, post, web::{self}, HttpResponse};
use sqlx::PgPool;

use crate::{models::{AuthedUser, Code, GetLeaderbordRequest, Leader}, response_wrapper::{internal_error_json, response_ok}, utils::{commit_tx, hash_to_code, start_tx}};

#[post("/referral/code")]
async fn get_referal_code(
	pool: web::Data<PgPool>,
	auth_user: AuthedUser,
) -> Result<HttpResponse, ActixError> {
	let mut tx = start_tx(pool.get_ref())
	.await
	.map_err(|e| {
		log::error!("Failed to start transaction in get_referral_code: {:?}", e);
		internal_error_json("Failed to start transaction")
	})?;

	// Already have code?
	let code = sqlx::query_as!(
		Code,
		"SELECT code FROM referral_codes WHERE referrer = $1",
		auth_user.user_id
	)
	.fetch_optional(&mut *tx)
	.await
	.map_err(|e| {
		log::error!("Failed to fetch referral code: {:?}", e);
		internal_error_json("Failed to fetch referral code")
	})?;

	if let Some(code) = code {
		return Ok(response_ok(code));
	}

	// Get user wallet
	let row = sqlx::query!(
		"SELECT wallet FROM users WHERE id = $1",
		auth_user.user_id
	)
	.fetch_one(&mut *tx)
	.await
	.map_err(|e| {
		log::error!("Failed to fetch wallet for user {:?}: {:?}", auth_user.user_id, e);
		internal_error_json("Failed to fetch wallet")
	})?;

	let wallet = row.wallet;

	// Gen code
	let code: String = hash_to_code(wallet.to_string());

	sqlx::query!(
		"INSERT INTO referral_codes(referrer, code) VALUES ($1, $2)",
		auth_user.user_id,
		code
	)
	.execute(&mut *tx)
	.await
	.map_err(|e| {
		log::error!("Failed to insert referral code: {:?}", e);
		internal_error_json("Failed to insert referral code")
	})?;

	commit_tx(tx)
		.await
		.map_err(|e| {
			log::error!("Failed to commit transaction in get_referral_code: {:?}", e);
			internal_error_json("Failed to commit transaction")
		})?;

	Ok(response_ok(Code {
		code: code.to_owned(),
	}))

}

#[post("/referral/leader_board")]
async fn get_leaderbord(
	pool: web::Data<PgPool>,
	_auth_user: AuthedUser,
	req: web::Json<GetLeaderbordRequest>,
) -> Result<HttpResponse, ActixError> {
	let mut tx = start_tx(pool.get_ref())
		.await
		.map_err(|e| {
			log::error!(" Failed to start transaction in get_leaderbord: {:?}", e);
			internal_error_json("Failed to start transaction")
		})?;

	let leaders = sqlx::query_as!(
		Leader,
		r#"
		SELECT referrer,
			COUNT(*) AS "number_invitees!: i64"
		FROM referrals
		WHERE invited_at > NOW() - ($2::text || ' DAY')::INTERVAL
		GROUP BY referrer
		ORDER BY COUNT(*) DESC
		LIMIT $1
		"#,
		req.limit as i32,
		req.interval_day.to_string()
	)
	.fetch_all(&mut *tx)
	.await
	.map_err(|e| {
		log::error!("Failed to fetch leaderboard: {:?}", e);
		internal_error_json("Failed to fetch leaderboard")
	})?;

	commit_tx(tx)
		.await
		.map_err(|e| {
			log::error!("Failed to commit transaction in get_leaderbord: {:?}", e);
			internal_error_json("Failed to commit transaction")
		})?;

	Ok(response_ok(leaders))
}
