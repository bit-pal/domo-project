use config::{Config, Environment};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Settings {
	pub database_url: String,
	pub jwt_secret: String,
	#[allow(dead_code)]
	pub server_host: String,
	#[allow(dead_code)]
	pub server_port: u16,
	#[allow(dead_code)]
	pub solana_rpc_url: String,
	#[allow(dead_code)]
	pub domo_mint: String,
	#[allow(dead_code)]
	pub deposit_wallet: String,
}

impl Settings {
	pub fn new() -> anyhow::Result<Self> {
		let cfg = Config::builder()
			.add_source(Environment::with_prefix("APP").separator("__"))
			.build()?;
		
		cfg.try_deserialize().map_err(Into::into)
	}
}
