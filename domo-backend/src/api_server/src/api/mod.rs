pub mod auth_api;
pub mod user_api;
pub mod game_api;
pub mod referral_api;
pub mod employee_api;
pub mod balance_api;

#[cfg(test)]
mod tests {
	use crate::utils::verify_offchain_signature;

	#[test]
	fn test_valid_signature() {
		let wallet = "DR2BCjL1yX5HnuTSYVMeRY5tsHd8ZJZz2vFf5zs5aYop";
		let signature = "2XP1mHvXaRHzp6ZNSQHMgr2bgDEpHwWkW4fBLCzzWxCkRi99ryyUAbUVFratTjhhw1nQxj4WQhZhxnjA7cEnncBV";
		let nonce = "55f04639-d058-407a-8b38-7df7b20b39a0";

		let result = verify_offchain_signature(wallet, signature, nonce);
		assert!(result.is_ok(), "Signature should be valid but got error: {:?}", result);
	}
}
