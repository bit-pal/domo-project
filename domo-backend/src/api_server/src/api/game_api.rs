use actix_web::{get, post, web, Error, HttpResponse};
use sqlx::PgPool;
use crate::{models::{AddEmployeeQuery, AuthedUser, PutToolRequest, Referrer, ID}, response_wrapper::{internal_error_json, response_ok, response_success}, utils::{commit_tx, start_tx}};
use game_core::logic::{boss_logic::{get_boss_employees, get_boss_inventory}, employee_logic::find_or_create_employee};

#[get("/employee/add")]
async fn add_employee(
	pool: web::Data<PgPool>,
	auth_user: AuthedUser,
	query: web::Query<AddEmployeeQuery>,
) -> Result<HttpResponse, Error> {
	let mut tx = start_tx(pool.get_ref())
		.await
		.map_err(|e| {
			log::error!("Failed to start transaction in add_employee: {:?}", e);
			internal_error_json("Failed to start database transaction")
		})?;

	let employee = find_or_create_employee(
			&mut tx,
			auth_user.user_id,
			auth_user.base_id,
			query.name.clone(),
			query.profession_id,
		)
		.await
		.map_err(|e| {
			log::error!("Failed to create employee (user: {:?}): {:?}", auth_user.user_id, e);
			internal_error_json("Failed to create employee")
		})?;

	commit_tx(tx)
		.await
		.map_err(|e| {
			log::error!("Failed to commit transaction in add_employee: {:?}", e);
			internal_error_json("Failed to commit transaction")
		})?;

	Ok(response_ok(employee))
}

#[post("/starter_pack")]
async fn get_starter_pack(
	pool: web::Data<PgPool>,
	auth_user: AuthedUser,
)  -> Result<HttpResponse, Error> {
	let mut tx = start_tx(pool.get_ref())
		.await
		.map_err(|e| {
			log::error!("Failed to start transaction in get_starter_pack: {:?}", e);
			internal_error_json("Failed to start transaction")
		})?;

	let already_received = sqlx::query_as!(
		ID,
		"SELECT user_id as id FROM starter_pack_recipients WHERE user_id = $1",
		auth_user.user_id,
	)
	.fetch_optional(&mut *tx)
	.await
	.map_err(|e| {
		log::error!("Failed to query starter_pack_recipients: {:?}", e);
		internal_error_json("Failed to query starter pack status")
	})?
	.is_some();

	if already_received {
		log::warn!("User {:?} already received a starter pack", auth_user.user_id);
		return Err(actix_web::error::ErrorConflict("User has already received a starter pack"));
	}

	sqlx::query!(
		"INSERT INTO starter_pack_recipients(user_id) VALUES ($1)",
		auth_user.user_id,
	)
	.execute(&mut *tx)
	.await
	.map_err(|e| {
		log::error!("Failed to insert into starter_pack_recipients: {:?}", e);
		internal_error_json("Failed to store starter pack claim")
	})?;

	let opt_referrer = sqlx::query_as!(
		Referrer,
		"SELECT referrer FROM referrals WHERE referral = $1",
		auth_user.user_id,
	)
	.fetch_optional(&mut *tx)
	.await
	.map_err(|e| {
		log::error!("Failed to query referrer: {:?}", e);
		internal_error_json("Failed to query referrer info")
	})?;

	if let Some(wrapped_referrer) = opt_referrer {
		sqlx::query!(
			"UPDATE bases
			SET capacity = bases.capacity + 1
			WHERE boss_id = (
				SELECT id FROM bosses WHERE user_id = $1
			)",
			wrapped_referrer.referrer,
		)
		.execute(&mut *tx)
		.await
		.map_err(|e| {
			log::error!("Failed to update base capacity for referrer {:?}: {:?}", wrapped_referrer.referrer, e);
			internal_error_json("Failed to update referrer base capacity")
		})?;
	}

	commit_tx(tx)
		.await
		.map_err(|e| {
			log::error!("Failed to commit transaction in get_starter_pack: {:?}", e);
			internal_error_json("Failed to commit transaction")
		})?;

	Ok(response_success())
}

#[post("/boss/put/tool")]
async fn get_tool(
	pool: web::Data<PgPool>,
	_auth_user: AuthedUser,
	req: web::Json<PutToolRequest>,
)  -> Result<HttpResponse, Error> {
	let mut tx = start_tx(pool.get_ref())
		.await
		.map_err(|e| {
			log::error!("Failed to start transaction in get_tool: {:?}", e);
			internal_error_json("Failed to start transaction")
		})?;

	sqlx::query!(
		"INSERT INTO inventory (owner_id, tool_id) VALUES ($1, $2)",
		req.boss_id,
		req.tool_id,
	)
	.execute(&mut *tx)
	.await
	.map_err(|e| {
		log::error!("Failed to insert tool into inventory: {:?}", e);
		internal_error_json("Failed to insert tool into inventory")
	})?;

	commit_tx(tx)
		.await
		.map_err(|e| {
			log::error!("Failed to commit transaction in get_tool: {:?}", e);
			internal_error_json("Failed to commit transaction")
		})?;

	Ok(response_success())
}

#[post("/boss/get/employee/list")]
async fn get_employees(
	pool: web::Data<PgPool>,
	auth_user: AuthedUser,
) -> Result<HttpResponse, Error> {
	let mut tx = start_tx(pool.get_ref())
		.await
		.map_err(|e| {
			log::error!("Failed to start transaction in get_employees: {:?}", e);
			internal_error_json("Failed to start transaction")
		})?;

	let res = get_boss_employees(&mut tx, auth_user.user_id)
		.await
		.map_err(|e| {
			log::error!("Failed to get boss employees for user {:?}: {:?}", auth_user.user_id, e);
			internal_error_json("Failed to get boss employees")
		})?;

	commit_tx(tx)
		.await
		.map_err(|e| {
			log::error!("Failed to commit transaction in get_employees: {:?}", e);
			internal_error_json("Failed to commit transaction")
		})?;

	Ok(response_ok(res))
}

#[post("/boss/get/inventory")]
async fn get_inventory(
	pool: web::Data<PgPool>,
	auth_user: AuthedUser,
) -> Result<HttpResponse, Error> {
	let mut tx = start_tx(pool.get_ref())
		.await
		.map_err(|e| {
			log::error!("Failed to start transaction in get_boss_inventory: {:?}", e);
			internal_error_json("Failed to start transaction")
		})?;

	let res = get_boss_inventory(&mut tx, auth_user.user_id)
		.await
		.map_err(|e| {
			log::error!("Failed to fetch boss inventory for user {:?}: {:?}", auth_user.user_id, e);
			internal_error_json("Failed to fetch boss inventory")
		})?;

	commit_tx(tx)
		.await
		.map_err(|e| {
			log::error!("Failed to commit transaction in get_boss_inventory: {:?}", e);
			internal_error_json("Failed to commit transaction")
		})?;

	Ok(response_ok(res))
}
