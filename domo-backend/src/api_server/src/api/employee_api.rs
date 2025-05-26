use actix_web::{post, web, Error, HttpResponse};
use game_core::logic::employee_logic::employee_set_tool;
use sqlx::PgPool;

use crate::{models::{AuthedUser, SetToolRequest}, response_wrapper::{internal_error_json, response_success}, utils::{commit_tx, start_tx}};

//TODO: move to Game API
#[post("/employee/set/tools")]
async fn set_tool(
	pool: web::Data<PgPool>,
	_auth_user: AuthedUser,
	query: web::Query<SetToolRequest>,
) -> Result<HttpResponse, Error> {
	let mut tx = start_tx(pool.get_ref())
		.await
		.map_err(|e| {
			log::error!("Failed to start transaction in set_tool: {:?}", e);
			internal_error_json("Failed to start transaction")
		})?;

	if let Err(e) = employee_set_tool(&mut tx, query.employee_id, query.tool_id).await {
		log::error!(
			"Failed to set tool for employee {:?} -> tool {:?}: {:?}",
			query.employee_id, query.tool_id, e
		);
		return Err(internal_error_json("Failed to set tool for employee"));
	}

	if let Err(e) = commit_tx(tx).await {
		log::error!("Failed to commit transaction in set_tool: {:?}", e);
		return Err(internal_error_json("Failed to commit transaction"));
	}

	Ok(response_success())
}