use sqlx::{query_as, Postgres, Transaction};
use crate::domain::domains::Base;
use crate::repository::base_repo::BaseRepository;
use async_trait::async_trait;
use uuid::Uuid;

pub struct PgBaseRepository {}

#[async_trait]
impl BaseRepository for PgBaseRepository {
	async fn create(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		boss_id: Uuid,
	) -> Result<Base, anyhow::Error> {
		let row = query_as::<_, Base>(
			"INSERT INTO bases (boss_id)
			 VALUES ($1)
			 RETURNING id, boss_id, level, capacity, extra_slots"
		)
		.bind(boss_id)
		.fetch_one(&mut **tx)
		.await?;

		Ok(row)
	}

	async fn find_by_boss(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		boss_id: Uuid,
	) -> Result<Option<Base>, anyhow::Error> {
		let row = query_as::<_, Base>(
			"SELECT id, boss_id, level, capacity, extra_slots FROM bases WHERE boss_id = $1"
		)
		.bind(boss_id)
		.fetch_optional(&mut **tx)
		.await?;

		Ok(row)
	}
}