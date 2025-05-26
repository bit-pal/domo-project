use crate::domain::domains::{PgFullEmployee};
use crate::infra::{pg_boss_repo::PgBossRepository, pg_employee_repo::PgEmployeeRepository};
use crate::repository::{boss_repo::BossRepository, employee_repo::EmployeeRepository};
use crate::utils::DEFAULT_PROFESSION_ID;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;
use log;
use anyhow::anyhow;

pub async fn find_or_create_employee(
	tx: &mut Transaction<'_,Postgres>,
	user_id: Uuid,
	base_id: Uuid,
	name: String,
	profession_id: Option<Uuid>,
) -> Result<PgFullEmployee, anyhow::Error> {
	let boss_repo = PgBossRepository { };
	let employee_repo = PgEmployeeRepository { };

	// Find or create boss
	let boss = match boss_repo.find_by_user(tx, user_id).await {
		Ok(Some(b)) => b,
		Ok(None) => {
			log::error!("Boss not found for user_id: {:?}", user_id);
			return Err(anyhow::anyhow!("Boss not found for user_id: {:?}", user_id));
		}
		Err(e) => {
			log::error!("Error finding boss: {:?}", e);
			return Err(e);
		}
	};

	// Use default profession if it doesnt set
	let profession_id = profession_id.unwrap_or(*DEFAULT_PROFESSION_ID);

	// Create employee
	let employee = employee_repo
		.create(tx, boss.id, base_id, &name, profession_id)
		.await
		.map_err(|e| {
			log::error!("Error creating employee: {:?}", e);
			e
		})?;

	log::info!(
		"Employee created: employee id {:?} for boss id {:?}",
		employee.id,
		boss.id
	);

	Ok(employee)
}

pub async fn employee_set_tool(
	tx: &mut Transaction<'_,Postgres>,
	employee_id: Uuid,
	tool_id: Uuid,
) -> Result<(), anyhow::Error> {
	let employee_repo = PgEmployeeRepository { };

	if !employee_repo.has_tool(tx, employee_id, tool_id).await? {
		return Err(anyhow!("Cant find free tool"));
	}

	employee_repo.reserve_tool(tx, employee_id, tool_id).await?;
	employee_repo.set_tool(tx, employee_id, tool_id).await?;

	Ok(())
}
