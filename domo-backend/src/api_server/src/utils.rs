use actix_web::{error::{ErrorBadRequest, InternalError}, web, Error, FromRequest, HttpRequest};
use anyhow::anyhow;
use ed25519_dalek::{VerifyingKey, Signature, Verifier};
use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};
use sqlx::{PgPool, Postgres, Transaction};
use thiserror::Error;
use uuid::Uuid;
use std::{convert::TryInto};
use byteorder::{LittleEndian, WriteBytesExt};
use futures::future::{ready, Ready};
use sha2::{Digest, Sha256};
use lazy_static::lazy_static;

use crate::{domo_config::Settings, models::{AuthedUser, BalanceOperationRequest, JwtClaims, Referrer, ID}, response_wrapper::unauthorized};

pub const JWT_EXPIRE: i64 = 86_400;

lazy_static!{
	pub static ref NONCE_LIVETIME: i32 = 5;
}

#[derive(Debug, Error)]
pub enum AuthError {
	#[error("Base58 decoding error: {0}")]
	DecodeError(#[from] bs58::decode::Error),
	#[error("Invalid public key length")]
	PublicKeyLength,
	#[error("Invalid signature length")]
	SignatureLength,
	#[error("Signature verification failed")]
	VerificationFailed(#[from] ed25519_dalek::SignatureError),
}

/// Verifies an off-chain Solana signature.
///
/// The signature must be created using the `solana sign-offchain-message`
/// CLI or the equivalent logic. This function constructs the message buffer
/// using the same internal format:
///
/// - Prefix: `\xffsolana offchain\x00\x00`
/// - 2-byte little-endian message length
/// - Message bytes in UTF-8
///
/// # Arguments
///
/// * `wallet` - Base58-encoded 32-byte public key
/// * `sig_b58` - Base58-encoded 64-byte Ed25519 signature
/// * `message` - Original message (nonce or other string) signed by the client
///
/// # Returns
///
/// * `Ok(())` if the signature is valid
/// * `Err(AuthError)` if decoding or verification fails
pub fn verify_offchain_signature(
	wallet: &str,
	sig_b58: &str,
	message: &str,
) -> Result<(), AuthError> {
	// decode base58
	let wallet_vec = bs58::decode(wallet).into_vec()?;
	let sig_vec    = bs58::decode(sig_b58).into_vec()?;
	
	// vec u8 -> array with normal size
	let wallet_bytes: [u8; 32] = wallet_vec
		.try_into()
		.map_err(|_| AuthError::PublicKeyLength)?;
	let sig_bytes:    [u8; 64] = sig_vec
		.try_into()
		.map_err(|_| AuthError::SignatureLength)?;
	
	// create objects for verify
	let verifying_key = VerifyingKey::from_bytes(&wallet_bytes)
		.map_err(|_| AuthError::PublicKeyLength)?;
	let signature = Signature::from_bytes(&sig_bytes);
	
	// do solana like buffer
	let mut buf = Vec::new();
	// prefix for 2 zeros in the end
	buf.extend_from_slice(b"\xffsolana offchain\x00\x00");  
	// little endian size
	buf.write_u16::<LittleEndian>(message.len() as u16).unwrap();
	// message bytes
	buf.extend_from_slice(message.as_bytes());

	// verify wrapped message
	verifying_key
		.verify(&buf, &signature)
		.map_err(AuthError::VerificationFailed)?;
	
	Ok(())
}

pub fn hash_to_code(wallet: String) -> String {
	let mut hasher = Sha256::new();
	hasher.update(wallet.as_bytes());
	let result = hasher.finalize();
	hex::encode(&result[..4])
}

pub async fn apply_referral_code(
	code: String,
	tx: &mut Transaction<'_,Postgres>,
	wallet: String,
) -> Result<(), anyhow::Error> {
	let opt_referrer = sqlx::query_as!(
		Referrer,
		"SELECT referrer FROM referral_codes
		WHERE code = $1;",
		code,
	)
	.fetch_optional(&mut **tx)
	.await
	.map_err(|err| anyhow!("{err}"))?;

	if let Some(wrapped_referrer) = opt_referrer {
		let referral = 
			sqlx::query_as!(
				ID,
				"SELECT id FROM users
				WHERE wallet = $1",
				wallet,
			)
			.fetch_one(&mut **tx)
			.await
			.map_err(|err| anyhow!("{err}"))?;

		sqlx::query!(
			"INSERT INTO referrals(referrer, referral, invited_at)
			VALUES($1, $2, CURRENT_TIMESTAMP);",
			wrapped_referrer.referrer,
			referral.id,
		)
		.execute(&mut **tx)
		.await
		.map_err(|err| anyhow!("{err}"))?;
	} else {
		return Err(anyhow!(
			"Referrer with code {} not found",
			code
		));
	}

	Ok(())
}

pub async fn start_tx(pool: &PgPool) -> Result<Transaction<Postgres>, anyhow::Error> {
	pool
		.begin()
		.await
		.map_err(|err| anyhow!(format!("Error start tx - {}", err)))
}

pub(crate) async fn commit_tx(tx: Transaction<'_, Postgres>) -> Result<(), anyhow::Error> {
	tx.commit().await.map_err(|err| {
		anyhow!(format!("Cant aprove tx - {}", err))
	})?;
	Ok(())
}

impl FromRequest for AuthedUser {
	type Error = Error;
	type Future = Ready<Result<Self, Self::Error>>;

	fn from_request(req: &HttpRequest, _: &mut actix_http::Payload) -> Self::Future {
		log::debug!("\n🔐 Starting AuthedUser extractor...\n");

		// Get jwt_secret from app_data
		let settings = match req.app_data::<web::Data<Settings>>() {
			Some(s) => s,
			None => {
				log::error!("Missing Settings in app_data");
				return ready(Err(
					InternalError::from_response(
						"missing_settings",
						unauthorized("Settings not configured"),
					).into()
				));
			}
		};

		// Get Authorization
		let auth_header = match req.headers().get("Authorization") {
			Some(h) => h.to_str().unwrap_or(""),
			None => {
					log::error!("Authorization header is not valid");
					return ready(Err(
						InternalError::from_response(
						"missing_auth_header",
						unauthorized("Missing Authorization header"),
					).into()
				));
			}
		};

		// Get token
		if !auth_header.starts_with("Bearer ") {
			log::error!("Authorization header is missing");
			return ready(Err(
				InternalError::from_response(
					"bad_auth_format",
					unauthorized("Invalid Authorization format"),
				).into()
			));
		}

		let token = auth_header.trim_start_matches("Bearer ").trim();
		log::debug!("Extracted JWT token: {}", token);

		// Decode JWT
		let token_data = decode::<JwtClaims>(
			token,
			&DecodingKey::from_secret(settings.jwt_secret.as_bytes()),
			&Validation::new(Algorithm::HS256),
		);

		match token_data {
			Ok(data) => {
				let user_id = Uuid::parse_str(&data.claims.user_id);
				let boss_id = Uuid::parse_str(&data.claims.boss_id);
				let base_id = Uuid::parse_str(&data.claims.base_id);

				match (user_id, boss_id, base_id) {
					(Ok(user_id), Ok(boss_id), Ok(base_id)) => {
						log::error!("Parsed all IDs: user {}, boss {}, base {}", user_id, boss_id, base_id);
						ready(Ok(AuthedUser { user_id, boss_id, base_id }))
					}
					_ => {
						log::error!("Failed to parse one or more UUIDs from claims");
						ready(Err(
							InternalError::from_response(
								"bad_claims",
								unauthorized("Invalid IDs in token"),
							).into()
						))
					}
				}
			}
			Err(err) => {
				log::error!("JWT decode error: {:?}", err);
				ready(Err(
					InternalError::from_response(
						"jwt_decode",
						unauthorized("Invalid or expired token"),
					).into()
				))
			}
		}
	}
}

impl FromRequest for BalanceOperationRequest {
	type Error = actix_web::Error;
	type Future = Ready<Result<Self, Self::Error>>;

	fn from_request(req: &HttpRequest, payload: &mut actix_web::dev::Payload) -> Self::Future {
		let json_fut = actix_web::web::Json::<Self>::from_request(req, payload);
		
		ready(
			futures::executor::block_on(json_fut)
				.map(|json| json.into_inner())
				.map_err(|e| ErrorBadRequest(e.to_string())))
	}
}
