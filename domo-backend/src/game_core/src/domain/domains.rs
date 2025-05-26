use serde::{Deserialize, Serialize};
use uuid::Uuid;
use bigdecimal::BigDecimal;
use chrono::{DateTime, Utc};
use sqlx::{FromRow};
use sqlx::types::time::OffsetDateTime;

#[derive(Debug, Clone, FromRow, Serialize)]
pub struct Boss {
	pub id: Uuid,
	pub user_id: Uuid,
	pub domo_balance: BigDecimal,
}

#[derive(Debug, Serialize, FromRow)]
pub struct FullBoss {
	pub boss: Boss,
	pub vault: Option<Vault>,
	pub base: Option<Base>,
	pub employees: Vec<PgFullEmployee>,
}

#[derive(Debug, Serialize, FromRow)]
pub struct RawEmployeeRow {
	pub id: Uuid,
	pub name: String,
	pub level: i32,
	pub cooldown_until: Option<OffsetDateTime>,
	pub created_at: OffsetDateTime,

	pub p_id: Option<Uuid>,
	pub p_name: Option<String>,
	pub p_income: Option<f32>,
	pub p_stability: Option<f32>,
}

#[derive(Debug, Serialize, FromRow)]
pub struct Vault {
	pub id: Uuid,
	pub boss_id: Uuid,
	pub level: i32,
	pub capacity: f64,
	pub current_amount: f64,
	pub auto_claim: bool,
	pub last_claimed: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize, FromRow)]
pub struct Base {
	pub id: Uuid,
	pub boss_id: Uuid,
	pub level: i32,
	pub capacity: i32,
	pub extra_slots: i32,
}

#[derive(Debug, Serialize, FromRow)]
pub struct PgFullEmployee {
	pub id: Uuid,
	pub name: String,
	pub level: i32,
	pub cooldown_until: Option<DateTime<Utc>>,
	pub created_at: DateTime<Utc>,
	pub profession_id: Option<Uuid>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct FullEmployee {
	pub id: Uuid,
	pub boss_id: Uuid,
	pub base_id: Uuid,
	pub name: String,
	pub level: i32,
	pub profession_id: Uuid,
	pub cooldown_until: Option<DateTime<Utc>>,
	pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, FromRow)]
pub struct Profession {
	pub id: Uuid,
	pub name: String,
	pub income_multiplier: f32,
	pub stability_multiplier: f32,
}

#[derive(Serialize, FromRow)]
pub struct Employee {
	pub name: String,
	pub level: i32,
	pub profession: String,
	pub cooldown_until: Option<OffsetDateTime>,
	pub created_at: Option<OffsetDateTime>,
	pub tool_name: Option<String>,
}

#[derive(Serialize, FromRow)]
pub struct InventoryItem {
	pub tool_name: String,
	pub count: i32,
	pub number_used: i32,
}

#[derive(Serialize, FromRow)]
pub struct UserBalance {
	pub sol_balance: i32,
	pub domo_balance: i32,
}
