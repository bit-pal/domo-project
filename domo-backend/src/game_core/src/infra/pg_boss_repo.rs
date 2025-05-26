use sqlx::{query_as, Postgres, Transaction};
use crate::domain::domains::{Boss, Employee, InventoryItem};
use crate::repository::boss_repo::BossRepository;
use async_trait::async_trait;
use uuid::Uuid;
use anyhow::anyhow;

pub struct PgBossRepository {}

#[async_trait]
impl BossRepository for PgBossRepository {
	async fn create(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
	) -> Result<Boss, anyhow::Error> {
		let row = query_as::<_, Boss>(
			"INSERT INTO bosses (user_id, domo_balance)
			 VALUES ($1, 0.0)
			 RETURNING id, user_id, domo_balance"
		)
		.bind(user_id)
		.fetch_one(&mut **tx)
		.await?;

		Ok(row)
	}

	async fn find_by_user(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
	) -> Result<Option<Boss>, anyhow::Error> {
		let row = query_as::<_, Boss>(
			"SELECT id, user_id, domo_balance FROM bosses WHERE user_id = $1"
		)
		.bind(user_id)
		.fetch_optional(&mut **tx)
		.await?;

		Ok(row)
	}

	async fn get_employees(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		boss_id: Uuid
	) -> Result<Vec<Employee>, anyhow::Error> {
		let employees = sqlx::query_as!(
			Employee,
			"SELECT e.name,
				e.level,
				p.name AS profession,
				e.cooldown_until,
				e.created_at,
				t.name AS tool_name
			FROM employees e
			JOIN professions p ON e.profession_id = p.id
			JOIN tools t ON e.tool_id = t.id
			JOIN bosses b ON e.boss_id = b.id
			WHERE b.id = $1;",
			boss_id,
		)
		.fetch_all(&mut **tx)
		.await
		.map_err(|err| anyhow!("{err}"))?;

		Ok(employees)
	}

	async fn get_inventory(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		boss_id: Uuid
	) -> Result<Vec<InventoryItem>, anyhow::Error> {
		let items = sqlx::query_as!(
			InventoryItem,
			"SELECT t.name AS tool_name,
				count,
				number_used
			FROM inventory i
			JOIN tools t ON i.tool_id = t.id
			WHERE owner_id = $1;",
			boss_id,
		)
		.fetch_all(&mut **tx)
		.await
		.map_err(|err| anyhow!("{err}"))?;

		Ok(items)
	}
}