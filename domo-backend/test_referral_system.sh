#!/bin/bash

echo "--- REFERRER ---"

./registration.sh -new
PUBKEY=$(solana-keygen pubkey "$HOME/.config/solana/id.json")
echo "Pubkey: $PUBKEY"

GET_CODE_RESPONSE=$(curl -sS -X POST http://127.0.0.1:8080/referral/code \
  -H "Content-Type: application/json" \
  -d "{\"wallet\": \"$PUBKEY\"}")

echo "GET_CODE_RESPONSE:"
echo "$GET_CODE_RESPONSE" | jq

REFERRER=$(echo "$GET_CODE_RESPONSE" | jq -r '.code // .msg.code')
echo "CODE: ${REFERRER}"

echo ""
echo "--- REFERRAL ---"

solana-keygen new --force --no-bip39-passphrase -o ~/.config/solana/id.json
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
    --arg referrer "$REFERRER" \
    '{wallet: $wallet, signature: $signature, nonce: $nonce, referrer: $referrer}')" \
  http://localhost:8080/auth/login)

echo "JWT_RESPONSE:"
echo "$JWT_RESPONSE" | jq

JWT=$(echo "$JWT_RESPONSE" | jq -r '.msg.jwt')
echo "JWT: $JWT"
