use async_trait::async_trait;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;
use crate::domain::domains::Base;

#[async_trait]
pub trait BaseRepository {
	async fn create(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		boss_id: Uuid,
	) -> Result<Base, anyhow::Error>;
	async fn find_by_boss(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		boss_id: Uuid,
	) -> Result<Option<Base>, anyhow::Error>;
}