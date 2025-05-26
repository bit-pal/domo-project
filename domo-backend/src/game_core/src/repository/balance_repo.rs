use async_trait::async_trait;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;

use crate::domain::domains::{UserBalance};


#[async_trait]
pub trait BalanceRepository {
	async fn deposit_domo(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
		token_count: u32,
	) -> Result<(), anyhow::Error>;

	async fn deposit_sol(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
		token_count: u32,
	) -> Result<(), anyhow::Error>;

	async fn spend_domo(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
		token_count: u32,
	) -> Result<(), anyhow::Error>;

	async fn spend_sol(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
		token_count: u32,
	) -> Result<(), anyhow::Error>;

	async fn get(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
	) -> Result<UserBalance, anyhow::Error>;
}