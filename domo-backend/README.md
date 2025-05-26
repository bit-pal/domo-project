# Domo Backend — Guide for Running, Building, and Dependencies

## Dependencies

Before running, make sure you have installed:

- **Rust** (latest stable recommended, see [rustup.rs](https://rustup.rs/))
- **PostgreSQL** (and a created database)
- **libssl-dev** (for SQLx and OpenSSL support)
- **Git** (for cloning the repository)
- **cargo** (comes with Rust)
- **Solana CLI** (if required for Solana integration)

### Installing dependencies on Ubuntu/Debian

Setting up environment variables `.env`

```sh
sudo apt update
sudo apt install build-essential pkg-config libssl-dev libpq-dev git
cargo install sqlx-cli --no-default-features --features postgres
cd src/
sqlx migrate run
```

```sh
git clone https://github.com/your-org/domo-backend.git
cd domo-backend
cargo build --release
cargo run
```

By default, the server will start at http://127.0.0.1:8080

### Scripts

```sh
./registration.sh
```

#### Scripts flow:
Automates user creation, gets nonce and does login
