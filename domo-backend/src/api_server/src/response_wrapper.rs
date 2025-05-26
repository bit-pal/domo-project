use serde::Serialize;
use actix_web::{error::ErrorInternalServerError, HttpResponse};
use serde_json::Value;
#[derive(Serialize)]
pub struct ApiResponse<T>
where
	T: Serialize,
{
	pub msg: T,
	#[serde(skip_serializing_if = "Option::is_none")]
	pub error: Option<String>,
}

impl<T: Serialize> ApiResponse<T> {
	pub fn success(data: T) -> Self {
		ApiResponse {
			msg: data,
			error: None,
		}
	}

	pub fn error(message: impl Into<String>) -> ApiResponse<serde_json::Value> {
		ApiResponse {
			msg: serde_json::json!({}),
			error: Some(message.into()),
		}
	}
}

pub type ApiError = ApiResponse<Value>;

pub fn response_ok<T: Serialize>(data: T) -> HttpResponse {
	HttpResponse::Ok().json(ApiResponse::success(data))
}

pub fn response_success() -> HttpResponse {
	response_ok(serde_json::json!({ "status": "success" }))
}

pub fn internal_error_json(msg: impl Into<String>) -> actix_web::Error {
	log::error!("WOW ERROR");
	let json = serde_json::to_string(
		&ApiResponse::<serde_json::Value>::error(msg.into())
	).unwrap_or_else(|_| {
		r#"{"msg":{},"error":"Internal server error"}"#.to_string()
	});
	log::error!("WOW ERROR ENDDD");
	ErrorInternalServerError(json)
}

pub fn internal_error(msg: impl Into<String>) -> HttpResponse {
	HttpResponse::InternalServerError().json(ApiError::error(msg))
}

#[allow(dead_code)]
pub fn bad_request(msg: impl Into<String>) -> HttpResponse {
	HttpResponse::BadRequest().json(ApiError::error(msg))
}

#[allow(dead_code)]
pub fn not_found(msg: impl Into<String>) -> HttpResponse {
	HttpResponse::NotFound().json(ApiError::error(msg))
}

pub fn unauthorized(msg: impl Into<String>) -> HttpResponse {
	HttpResponse::Unauthorized().json(ApiError::error(msg))
}