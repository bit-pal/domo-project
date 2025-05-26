CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========== Autentification (Web3) ==========
-- Users table
CREATE TABLE IF NOT EXISTS users (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	wallet TEXT UNIQUE NOT NULL,
	created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX users_created_at_idx ON users(created_at);

-- Nonces table for sign and auth
CREATE TABLE nonces (
	wallet TEXT PRIMARY KEY,
	nonce TEXT NOT NULL,
	expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '5m'
);
CREATE INDEX nonces_expires_at_idx ON nonces(expires_at);

CREATE OR REPLACE FUNCTION clean_expired_nonces() 
RETURNS void AS $$
BEGIN
    DELETE FROM nonces WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;