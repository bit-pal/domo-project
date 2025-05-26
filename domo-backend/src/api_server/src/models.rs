use chrono::Utc;
use game_core::domain::domains::FullBoss;
use serde::{Deserialize, Serialize};
use sqlx::{prelude::FromRow};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct NonceRequest {
	pub wallet: String,
}

#[derive(Serialize)]
pub struct NonceResponse {
	pub nonce: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct AuthedUser {
	pub user_id: Uuid,
	#[allow(dead_code)]
	pub boss_id: Uuid,
	pub base_id: Uuid,
}

#[derive(Debug, Serialize, FromRow)]
pub struct User {
	pub id: Uuid,
	pub wallet: String,
	pub created_at: chrono::DateTime<Utc>,
}

#[derive(Debug, Serialize)]
pub struct GetMeResponse {
	pub user: User,
	pub boss: Option<FullBoss>,
}

#[derive(Serialize, Deserialize)]
pub struct LoginRequest {
	pub wallet: String,
	pub signature: String,
	pub nonce: String,
	#[serde(default)]
	pub referrer: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct GetReferralCodeRequest {
	pub wallet: String,
}

#[derive(Serialize, Deserialize)]
pub struct GetLeaderbordRequest {
	pub interval_day: u32,
	pub limit: u32,
}

#[derive(Serialize, Deserialize)]
pub struct PutToolRequest {
	pub tool_id: Uuid,
	pub boss_id: Uuid,
}

#[derive(Deserialize)]
pub struct SetToolRequest {
	pub employee_id: Uuid,
	pub tool_id: Uuid
}

#[derive(Deserialize)]
pub struct BalanceOperationRequest {
	pub token_amount: u32,
}

#[derive(Serialize)]
pub struct LoginResponse {
	pub jwt: String,
	pub expires_at: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct JwtClaims {
	pub user_id: String,
	pub boss_id: String,
	pub base_id: String,
	pub exp: usize,
}

#[derive(serde::Deserialize)]
pub struct AddEmployeeQuery {
	pub name: String,
	pub profession_id: Option<Uuid>,
}

#[derive(Serialize, FromRow)]
pub struct Code {
	pub code: String,
}

#[derive(FromRow)]
pub struct Referrer {
	pub referrer: Uuid,
}

#[derive(FromRow)]
pub struct ID {
	pub id: Uuid,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct Leader {
	pub referrer: Uuid,
	pub number_invitees: i64,
}
