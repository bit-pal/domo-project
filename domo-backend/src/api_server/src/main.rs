mod api;
mod models;
mod domo_config;
mod utils;
mod response_wrapper;

use std::time::Duration;

use actix_web::{web, App, HttpServer};
use api::{auth_api::{get_nonce, login}, balance_api::{domo_deposit, get_balance, sol_deposit}, game_api::{add_employee, get_employees, get_inventory, get_tool}, referral_api::{get_leaderbord, get_referal_code}, user_api::get_me};
use domo_config::Settings;
use sqlx::postgres::PgPoolOptions;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
	
	dotenv::dotenv().ok();
	
	env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("debug")).init();
	
	let settings = Settings::new().expect("Failed to load settings");
	
	let pool = PgPoolOptions::new()
		.max_connections(10)
		.min_connections(5)
		.idle_timeout(Duration::from_secs(5))
		.connect(&settings.database_url)
		.await
		.expect("Failed to create pool");
	let pool_data = web::Data::new(pool);
	let settings_data = web::Data::new(settings);

	HttpServer::new(move || {
		App::new()
			.app_data(settings_data.clone())
			.app_data(pool_data.clone())
			.service(get_nonce)
			.service(login)
			.service(get_me)
			.service(add_employee)
			.service(get_referal_code)
			.service(get_leaderbord)
			.service(get_tool)
			.service(get_inventory)
			.service(get_employees)
			.service(sol_deposit)
			.service(domo_deposit)
			.service(get_balance)
	})
	// How long the server will keep the connection open waiting for the next request from the client
	.keep_alive(Duration::from_secs(10))
	// Sets a timeout for receiving the entire request body from the client.
	.client_request_timeout(Duration::from_secs(10))
	// After an unexpected connection break from the client, the server will maintain the context for another N seconds
	.client_disconnect_timeout(Duration::from_secs(30))
	.workers(8)
	.bind(("127.0.0.1", 8080))?
	.run()
	.await
}