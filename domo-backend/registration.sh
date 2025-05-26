#!/bin/bash

PUBKEY=""

if [ "$#" -ge 1 ] && [ "$1" = "-new" ]; then
  echo "---> GENERATE NEW PUBKEY"
  solana-keygen new --force --no-bip39-passphrase -o ~/.config/solana/id.json
fi

PUBKEY=$(solana-keygen pubkey "$HOME/.config/solana/id.json")
echo "Pubkey: $PUBKEY"

NONCE_RESPONSE=$(curl -sS -X POST http://127.0.0.1:8080/auth/nonce \
  -H "Content-Type: application/json" \
  -d '{"wallet": "'"${PUBKEY}"'"}')
echo "Nonce response:"
echo "$NONCE_RESPONSE" | jq

NONCE=$(echo "$NONCE_RESPONSE" | jq -r '.msg.nonce')
echo "Nonce: $NONCE"

SIGNATURE=$(solana sign-offchain-message -k "$HOME/.config/solana/id.json" "$NONCE")
echo "Signature: $SIGNATURE"

JWT_RESPONSE=$(curl -sS -X POST \
  -H "Content-Type: application/json" \
  -d "$(jq -n \
    --arg wallet "$PUBKEY" \
    --arg signature "$SIGNATURE" \
    --arg nonce "$NONCE" \
    '{wallet: $wallet, signature: $signature, nonce: $nonce}')" \
  http://localhost:8080/auth/login)

echo "Full JWT Response:"
echo "$JWT_RESPONSE" | jq

JWT=$(echo "$JWT_RESPONSE" | jq -r '.msg.jwt')
echo "JWT: $JWT"
