use actix_web::{post, web, Error, HttpResponse};
use game_core::logic::balance_logic::{get_user_balance, user_deposit_domo, user_deposit_sol};
use sqlx::PgPool;

use crate::{models::{AuthedUser, BalanceOperationRequest}, response_wrapper::{internal_error_json, response_ok, response_success}, utils::{commit_tx, start_tx}};

#[post("/user/balance/deposit/domo")]
async fn domo_deposit(
	pool: web::Data<PgPool>,
	auth_user: AuthedUser,
	req: web::Json<BalanceOperationRequest>,
) -> Result<HttpResponse, Error> {
	let mut tx = start_tx(pool.get_ref())
		.await
		.map_err(|e| {
			log::error!("start_tx failed: {:?}", e);
			internal_error_json("Failed to start database transaction")
		})?;

	user_deposit_domo(&mut tx, auth_user.user_id, req.token_amount)
		.await
		.map_err(|e| {
			log::error!("user_deposit_domo failed: {:?}", e);
			internal_error_json("Failed to deposit DOMO")
		})?;

	commit_tx(tx)
		.await
		.map_err(|e| {
			log::error!("commit_tx failed: {:?}", e);
			internal_error_json("Failed to commit transaction")
		})?;

	Ok(response_success())
}

#[post("/user/balance/deposit/sol")]
async fn sol_deposit(
	pool: web::Data<PgPool>,
	auth_user: AuthedUser,
	req: web::Json<BalanceOperationRequest>,
) -> Result<HttpResponse, Error> {
	let mut tx: sqlx::Transaction<'_, sqlx::Postgres> = start_tx(pool.get_ref())
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

	user_deposit_sol(&mut tx,auth_user.user_id, req.token_amount)
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

	commit_tx(tx)
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

	Ok(response_success())
}

#[post("/user/balance")]
async fn get_balance(
	pool: web::Data<PgPool>,
	auth_user: AuthedUser,
) -> Result<HttpResponse, Error> {
	let mut tx = start_tx(pool.get_ref())
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

	let res = get_user_balance(&mut tx, auth_user.user_id)
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

	commit_tx(tx)
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

	Ok(response_ok(res))
}