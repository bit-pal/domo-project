use chrono::{DateTime, TimeZone, Utc};
use sqlx::types::time::OffsetDateTime;
use uuid::Uuid;
use lazy_static::lazy_static;

lazy_static!{
	pub static ref DEFAULT_PROFESSION_ID: Uuid = Uuid::from_u128(0x00000000000000000000000000000001);
}

// Добавляем функцию конвертации
pub fn convert_offset_to_chrono(offset: OffsetDateTime) -> DateTime<Utc> {
	let unix_timestamp = offset.unix_timestamp();
	Utc.timestamp_opt(unix_timestamp, 0).unwrap()
}