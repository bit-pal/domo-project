use async_trait::async_trait;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;
use crate::domain::domains::PgFullEmployee;

#[async_trait]
pub trait EmployeeRepository {
	async fn create(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		boss_id: Uuid,
		base_id: Uuid,
		name: &str,
		profession_id: Uuid,
	) -> Result<PgFullEmployee, anyhow::Error>;

	async fn count_by_base(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		base_id: Uuid,
	) -> Result<i64, anyhow::Error>;

	async fn set_tool(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		employee_id: Uuid,
		tool_id: Uuid,
	) -> Result<(), anyhow::Error>;

	async fn reserve_tool(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		employee_id: Uuid,
		tool_id: Uuid,
	) -> Result<(), anyhow::Error>;

	async fn has_tool(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		employee_id: Uuid,
		tool_id: Uuid,	
	) -> Result<bool, anyhow::Error>;
}