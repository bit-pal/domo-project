use async_trait::async_trait;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;
use crate::domain::domains::{Boss, Employee, InventoryItem};

#[async_trait]
pub trait BossRepository {
	async fn create(&self, tx: &mut Transaction<'_,Postgres>, user_id: Uuid) -> Result<Boss, anyhow::Error>;
	async fn find_by_user(&self,tx: &mut Transaction<'_,Postgres>, user_id: Uuid) -> Result<Option<Boss>, anyhow::Error>;
	async fn get_employees(&self, tx: &mut Transaction<'_,Postgres>, user_id: Uuid) -> Result<Vec<Employee>, anyhow::Error>;
    async fn get_inventory(&self, tx: &mut Transaction<'_,Postgres>, user_id: Uuid) -> Result<Vec<InventoryItem>, anyhow::Error>;
}