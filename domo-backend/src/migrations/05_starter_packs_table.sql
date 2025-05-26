CREATE TABLE IF NOT EXISTS starter_pack_recipients(
	user_id UUID NOT NULL UNIQUE,
	FOREIGN KEY(user_id) REFERENCES users(id)
		ON UPDATE CASCADE
);