use anyhow::anyhow;
use async_trait::async_trait;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;

use crate::{domain::domains::UserBalance, repository::balance_repo::BalanceRepository};

pub struct PgBalanceRepository {}

#[async_trait]
impl BalanceRepository for PgBalanceRepository {
	async fn deposit_domo(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
		token_count: u32,
	) -> Result<(), anyhow::Error> {
		sqlx::query!(
			"UPDATE domo_balance
			SET balance = $1
			WHERE user_id = $2;",
			token_count as i32,
			user_id,
		)
		.execute(&mut **tx)
		.await
		.map_err(|err| anyhow!("{err}"))?;

		Ok(())
	}

	async fn deposit_sol(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
		token_count: u32,
	) -> Result<(), anyhow::Error> {
		sqlx::query!(
			"UPDATE sol_balance
			SET balance = $1
			WHERE user_id = $2;",
			token_count as i32,
			user_id,
		)
		.execute(&mut **tx)
		.await
		.map_err(|err| anyhow!("{err}"))?;

		Ok(())
	}

	async fn spend_domo(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
		token_count: u32,
	) -> Result<(), anyhow::Error> {
		sqlx::query!(
			"UPDATE domo_balance
			SET balance = $1
			WHERE user_id = $2;",
			token_count as i32,
			user_id,
		)
		.execute(&mut **tx)
		.await
		.map_err(|err| anyhow!("{err}"))?;

		Ok(())
	}

	async fn spend_sol(
		&self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
		token_count: u32,
	) -> Result<(), anyhow::Error> {
		sqlx::query!(
			"UPDATE sol_balance
			SET balance = $1
			WHERE user_id = $2;",
			token_count as i32,
			user_id,
		)
		.execute(&mut **tx)
		.await
		.map_err(|err| anyhow!("{err}"))?;

		Ok(())
	}

	async fn get(
        &self,
		tx: &mut Transaction<'_,Postgres>,
		user_id: Uuid,
    ) -> Result<UserBalance, anyhow::Error> {
		let balance = sqlx::query_as!(
			UserBalance,
			"SELECT sb.balance AS sol_balance,
				db.balance AS domo_balance
			FROM users u
			JOIN domo_balance db ON db.user_id = u.id
			JOIN sol_balance sb ON sb.user_id = u.id
			WHERE u.id = $1;",
			user_id,
		)
		.fetch_optional(&mut **tx)
		.await
		.map_err(|err| anyhow!("{err}"))?
		.ok_or(anyhow!("Cant find balance for user {}", user_id.to_string()))?;

		Ok(balance)
	}
}
