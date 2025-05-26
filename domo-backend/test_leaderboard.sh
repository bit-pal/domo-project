#!/bin/bash

./test_referral_system.sh

LEADERS_RESPONSE=$(curl -sS -X POST http://127.0.0.1:8080/referral/leader_board \
  -H "Content-Type: application/json" \
  -d '{"interval": 5, "limit": 5}')

echo "LEADERS response:"
echo "$LEADERS_RESPONSE" | jq
