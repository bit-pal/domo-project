use crate::domain::domains::{InventoryItem, PgFullEmployee};
use crate::repository::employee_repo::EmployeeRepository;
use async_trait::async_trait;
use sqlx::{query_as, query_scalar, Postgres, Transaction};
use uuid::Uuid;
use anyhow::anyhow;

pub struct PgEmployeeRepository {}

#[async_trait]
impl EmployeeRepository for PgEmployeeRepository {
	async fn create(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		boss_id: Uuid,
		base_id: Uuid,
		name: &str,
		profession_id: Uuid,
	) -> Result<PgFullEmployee, anyhow::Error> {
		let row = query_as::<_, PgFullEmployee>(
			"INSERT INTO employees (boss_id, base_id, name, profession_id)
			VALUES ($1, $2, $3, $4)
			RETURNING id, boss_id, base_id, name, level, profession_id, cooldown_until, created_at"
		)
		.bind(boss_id)
		.bind(base_id)
		.bind(name)
		.bind(profession_id)
		.fetch_one(&mut **tx)
		.await?;

		Ok(row)
	}

	async fn count_by_base(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		base_id: Uuid,
	) -> Result<i64, anyhow::Error> {
		let count = query_scalar!(
			"SELECT COUNT(*) FROM employees WHERE base_id = $1",
			base_id
		)
		.fetch_one(&mut **tx)
		.await?
		.unwrap_or(0);

		Ok(count)
	}

	async fn has_tool(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		employee_id: Uuid,
		tool_id: Uuid,	
	) -> Result<bool, anyhow::Error> {
		let res = sqlx::query_as!(
			InventoryItem,
			"SELECT t.name AS tool_name,
				i.count,
				i.number_used
			FROM inventory i
			JOIN bosses b ON i.owner_id = b.id
			JOIN employees e ON e.boss_id = b.id
			JOIN tools t ON t.id = i.tool_id
			WHERE e.id = $1
				AND i.tool_id = $2
				AND i.number_used < count;",
			employee_id,
			tool_id,
		)
		.fetch_optional(&mut **tx)
		.await
		.map_err(|err| anyhow!("{err}"))?
		.is_some();

		Ok(res)
	}

	async fn reserve_tool(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		employee_id: Uuid,
		tool_id: Uuid,
	) -> Result<(), anyhow::Error> {
		sqlx::query!(
			"WITH inventory_owner AS (
				SELECT b.id
				FROM employees e
				JOIN bosses b ON b.id = e.boss_id
				WHERE e.id = $1
			)
			UPDATE inventory
			SET number_used = number_used + 1
			WHERE
				inventory.owner_id = (SELECT id FROM inventory_owner LIMIT 1)
				AND inventory.tool_id = $2;",
			employee_id,
			tool_id,
		)
		.execute(&mut **tx)
		.await
		.map_err(|err| anyhow!("{err}"))?;

		Ok(())
	}

	async fn set_tool(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		employee_id: Uuid,
		tool_id: Uuid,
	) -> Result<(), anyhow::Error> {
		sqlx::query!(
			"UPDATE employees
			SET tool_id = $1
			WHERE id = $2",
			tool_id,
			employee_id,
		)
		.execute(&mut **tx)
		.await
		.map_err(|err| anyhow!("{err}"))?;

		Ok(())
	}
}
