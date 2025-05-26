use crate::domain::domains::Base;
use crate::infra::pg_base_repo::PgBaseRepository;
use crate::repository::base_repo::BaseRepository;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;

// Check what base exists for boss, and create if it doesnt
pub async fn find_or_create_base(
	tx: &mut Transaction<'_,Postgres>,
	boss_id: Uuid
) -> Result<Base, anyhow::Error> {
	let repo = PgBaseRepository { };
	let maybe_base = match repo.find_by_boss(tx, boss_id).await {
		Ok(base) => base,
		Err(e) => {
			log::error!("Error finding base for boss_id {:?}: {:?}", boss_id, e);
			return Err(e);
		}
	};

	if let Some(base) = maybe_base {
		log::info!("Base already created: base_id {:?} for boss_id {:?}", base.id, boss_id);
		return Ok(base);
	}

	let base = match repo.create(tx, boss_id).await {
		Ok(base) => base,
		Err(e) => {
			log::error!("Error creating base for boss_id {:?}: {:?}", boss_id, e);
			return Err(e);
		}
	};

	log::info!("Base was created: base_id {:?} for boss_id {:?}", base.id, boss_id);
	Ok(base)
}
