CREATE TABLE IF NOT EXISTS domo_balance (
    user_id UUID PRIMARY KEY UNIQUE,
    balance INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sol_balance (
    user_id UUID PRIMARY KEY UNIQUE,
    balance INTEGER NOT NULL DEFAULT 0
);