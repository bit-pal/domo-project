use crate::domain::domains::{Boss, Employee, InventoryItem};
use crate::infra::pg_boss_repo::PgBossRepository;
use crate::repository::boss_repo::BossRepository;
use actix_web::web::Json;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;
use log;

// Check what boss exists for user, and create if it doesnt
pub async fn find_or_create_boss(
	tx: &mut Transaction<'_,Postgres>,
	user_id: Uuid,
) -> Result<Boss, anyhow::Error> {
	let repo = PgBossRepository { };
	let maybe_boss = match repo.find_by_user(tx, user_id).await {
		Ok(boss) => boss,
		Err(e) => {
			log::error!("Error finding boss for user_id {:?}: {:?}", user_id, e);
			return Err(e);
		}
	};

	if let Some(boss) = maybe_boss {
		log::info!("Boss already exists: boss_id {:?} for user_id {:?}", boss.id, user_id);
		return Ok(boss);
	}

	let boss = match repo.create(tx, user_id).await {
		Ok(boss) => boss,
		Err(e) => {
			log::error!("Error creating boss for user_id {:?}: {:?}", user_id, e);
			return Err(e);
		}
	};

	log::info!("Boss was created: boss_id {:?} for user_id {:?}", boss.id, user_id);
	Ok(boss)
}


pub async fn get_boss_inventory(
	tx: &mut Transaction<'_,Postgres>,
	boss_id: Uuid
) -> Result<Json<Vec<InventoryItem>>, anyhow::Error> {
	let boss_repo = PgBossRepository { };

	let items = boss_repo.get_inventory(tx, boss_id).await?;

	Ok(Json(items))
}

pub async fn get_boss_employees(
	tx: &mut Transaction<'_,Postgres>,
	boss_id: Uuid,
) -> Result<Json<Vec<Employee>>, anyhow::Error> {
	let boss_repo = PgBossRepository { };

	let employees = boss_repo.get_employees(tx, boss_id).await?;

	Ok(Json(employees))
}