-- Table with DOMO deposits
CREATE TABLE IF NOT EXISTS deposits (
	id UUID PRIMARY KEY,
	user_id UUID NOT NULL REFERENCES users(id),
	tx_hash TEXT UNIQUE NOT NULL,
	amount DOUBLE PRECISION NOT NULL,
	status TEXT NOT NULL DEFAULT 'pending',
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index for deposit status
CREATE INDEX IF NOT EXISTS idx_deposits_status ON deposits(status);