use actix_web::web::Json;
use anyhow::anyhow;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;
use crate::domain::domains::UserBalance;
use crate::repository::balance_repo::BalanceRepository;

use crate::{infra::pg_balance_repo::PgBalanceRepository};

pub async fn user_deposit_sol(
	tx: &mut Transaction<'_,Postgres>,
	user_id: Uuid,
	token_count: u32,
) -> Result<(), anyhow::Error> {
	let balance_repo = PgBalanceRepository { };
	balance_repo.deposit_sol(tx, user_id, token_count).await?;
	Ok(())
}

pub async fn user_deposit_domo(
	tx: &mut Transaction<'_,Postgres>,
	user_id: Uuid,
	token_count: u32,
) -> Result<(), anyhow::Error> {
	let balance_repo = PgBalanceRepository { };
	balance_repo.deposit_domo(tx, user_id, token_count).await?;
	Ok(())
}

pub async fn user_spend_sol(
	tx: &mut Transaction<'_,Postgres>,
	user_id: Uuid,
	token_count: u32,
) -> Result<(), anyhow::Error> {
	let balance_repo = PgBalanceRepository { };
	let balance = balance_repo.get(tx, user_id).await?;

	if balance.domo_balance  < token_count as i32 {
		return Err(anyhow!("Amount written off is greater than the balance"));
	}
	balance_repo.spend_domo(tx, user_id, token_count).await?;

	Ok(())
}


pub async fn spend_user_money(
	tx: &mut Transaction<'_,Postgres>,
	user_id: Uuid,
	token_count: u32,
) -> Result<(), anyhow::Error> {
	let balance_repo = PgBalanceRepository { };
	let balance = balance_repo.get(tx, user_id).await?;

	if balance.sol_balance < token_count as i32 {
		return Err(anyhow!("Amount written off is greater than the balance"));
	}
	balance_repo.spend_sol(tx, user_id, token_count).await?;
	
	Ok(())
}

pub  async fn get_user_balance(
	tx: &mut Transaction<'_,Postgres>,
	user_id: Uuid,	
) -> Result<Json<UserBalance>, anyhow::Error> {
	let balance_repo = PgBalanceRepository { };

	let balance = balance_repo.get(tx, user_id).await?;

	Ok(Json(balance))
}
