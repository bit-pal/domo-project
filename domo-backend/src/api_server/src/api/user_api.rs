use actix_web::{get, web, Error, HttpResponse};
use game_core::{domain::domains::{Base, Boss, FullBoss, PgFullEmployee, Profession, RawEmployeeRow, Vault}};
use sqlx::PgPool;
use game_core::utils::convert_offset_to_chrono;
use crate::{models::{AuthedUser, GetMeResponse, User}, utils::{commit_tx, start_tx}};

#[get("/me")]
async fn get_me(
	pool: web::Data<PgPool>,
	auth_user: AuthedUser,
) -> Result<HttpResponse, Error> {
	let mut tx = start_tx(pool.get_ref())
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

	let user = sqlx::query_as::<_, User>(
		r#"
		SELECT id, wallet, created_at
		FROM users
		WHERE id = $1
		"#
	)
	.bind(auth_user.user_id)
	.fetch_one(pool.get_ref())
	.await
	.map_err(actix_web::error::ErrorInternalServerError)?;

	let boss_opt = sqlx::query_as::<_, Boss>(
		r#"SELECT id, user_id, domo_balance FROM bosses WHERE user_id = $1"#
	)
	.bind(auth_user.user_id)
	.fetch_optional(&mut *tx)
	.await
	.map_err(actix_web::error::ErrorInternalServerError)?;

	let full_boss = if let Some(boss) = boss_opt.clone() {
		let vault = sqlx::query_as::<_, Vault>(
			r#"SELECT * FROM vaults WHERE boss_id = $1"#
		)
		.bind(boss.id)
		.fetch_optional(&mut *tx)
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

		let base = sqlx::query_as::<_, Base>(
			r#"SELECT * FROM bases WHERE boss_id = $1"#
		)
		.bind(boss.id)
		.fetch_optional(&mut *tx)
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

		let raw_employees = sqlx::query_as!(
			RawEmployeeRow,
			r#"
			SELECT
				e.id as "id!",
				e.name as "name!",
				e.level as "level!",
				e.cooldown_until as "cooldown_until?",
				e.created_at as "created_at!",
				p.id as "p_id?",
				p.name as "p_name?",
				p.income_multiplier::REAL as "p_income?",
				p.stability_multiplier::REAL as "p_stability?"
			FROM employees e
			LEFT JOIN professions p ON e.profession_id = p.id
			WHERE e.boss_id = $1
			"#,
			boss.id
		)
		.fetch_all(&mut *tx)
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

		let employees = raw_employees
		.into_iter()
		.map(|row| {
			let profession = match (row.p_id, row.p_name, row.p_income, row.p_stability) {
				(Some(id), Some(name), Some(income), Some(stability)) => Some(Profession {
					id,
					name,
					income_multiplier: income,
					stability_multiplier: stability,
				}),
				_ => None,
			};

			PgFullEmployee {
				id: row.id,
				name: row.name,
				level: row.level,
				cooldown_until: row.cooldown_until.map(convert_offset_to_chrono),
				created_at: convert_offset_to_chrono(row.created_at),
				profession_id: profession.as_ref().map(|p| p.id),
			}
		})
		.collect();

		Some(FullBoss {
			boss,
			vault,
			base,
			employees,
		})
	} else {
		None
	};

	commit_tx(tx)
		.await
		.map_err(actix_web::error::ErrorInternalServerError)?;

	Ok(HttpResponse::Ok().json(GetMeResponse {
		user,
		boss: full_boss,
	}))
}
