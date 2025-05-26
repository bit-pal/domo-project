# Backend HTTP API Documentation  

This document describes the HTTP API endpoints provided by the backend for the frontend application. 

---

# Message response format
### Error
```json
{
  "msg": {},
  "error": "Missing Authorization header"
}
```

### Success
```json
{
  "msg": {
    "nonce": "900aa14b-aa5e-4bfc-98cf-3b450ff1df21"
  }
}
```

---

## API

Auth API:
```
/auth/nonce
/auth/login
```
Balance API:
```
/user/balance/deposit/domo
/user/balance/deposit/sol
/user/balance
```
Game API:
```
/employee/set/tools
/employee/add
/starter_pack
/boss/put/tool
/boss/get/employee/list
/boss/get/inventory
```
Referral API:
```
/referral/code
/referral/leader_board
```

---

# Auth API
#### `POST /auth/nonce`  
Request body:  
```json
{
  "msg": {
    "nonce": "3317dce8-a7a7-486f-a481-92e7a35057da"
  }
}
```  
Response (success):  
```json
{
  "msg": {
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNTFjZmM3NTctZmQwZS00YzNlLWE5NDEtMzhkMDNkM2MwYzcwIiwiYm9zc19pZCI6IjgyNzM4MzNjLWQxOGMtNGUyNi1iODVmLTY2YTA4MjAyYjUzMSIsImJhc2VfaWQiOiI4Nzg2YjllZi02NGIyLTQ3MWUtYjVmYi1mNzI3ZTU0Mzc4N2UiLCJleHAiOjE3NDgwOTIwOTN9.Sm-ObHa4OzwM1EU6lRLrIKZ5q50nlokiMDzSakk4Ze8",
    "expires_at": 1748092093
  }
}
```

---

#### `POST /auth/login`  
Request body:  
```json
{
  "wallet": "EbEvjrVfkfd5VCjGGG1oeueK9RK6m5b6qc3oKYZGKcxN",
  "signature":"K92HcR3iGAn4BAiVnSrB...",
  "nonce": "a65dfc4e-d4a1-4063-91e1...",
  "referrer": "c789c9e6"
}
```  
Response (success):  
```json
{
  "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYTAxZGFiZGItN2I2OC00YWFkLWJhZWMtNjRmNGFjMDBjY2U3IiwiYm9zc19pZCI6IjEzMWJlYTRmLTExM2QtNDExMS1hNmMxLWQ5OTE1MDIwZmUzNSIsImJhc2VfaWQiOiI2M2M0OGNkMi00NzM0LTQ3MjUtYTc2MS0xNzczNWFhNGZlYWYiLCJleHAiOjE3NDgwNDQwMzh9.2bBoT8PlbUdEFpu_ED15LZEuZYh6DIBfXz4WbnhLK0Q"
}
``` 

---

# Game API

####  `POST /employee/set/tools`
Request body:  
```json
{
  "employee_id": "05897a57-2867-4517...",
  "tool_id": "05897a57-2867-4517-bec..."
}
```  

---

#### `PUT /employee/add`  
Request body:  
```json
{
  "name": "Some_Name",
  "profession_id": "05897a57-2867-451..."
}
```
Response (success):  
```json
{
  "id": "eyJhbGciOiJIUzI1NiIsInR5c...",
  "name": "Some Name",
  "level": 1,
  "cooldown_until": "2025-05-22 19:26:57.547001+03",
  "profession_id": "05897a57-2867-451..."
}
```  

---

#### `PUT /starter_pack` 
Request body:
```json
{
  "wallet": "3ikETMC58S4uqjS5ToXnqh6z..."
}
```

`POST /boss/put/tool`
Request body:
```json
{
  "tool_id": "3ikETMC58S4uqjS5ToXnqh6...",
  "boss_id": "3ikETMC58S4uqjS5ToXnqh6..."
}
```

---

#### `POST /boss/get/employee/list`
Request body:
```json
{
  "user_id": "3ikETMC58S4uqjS5ToXnqh6...",
  "boss_id": "3ikETMC58S4uqjS5ToXnqh6...",
  "base_id": "3ikETMC58S4uqjS5ToXnqh6..."
}
```
Response (success):
```json
[
  {
    "name": "Some Name",
    "level": 1,
    "profession": "Some Profession",
    "cooldown_until": "2025-05-22 19:26:57.547001+03",
    "created_at": "2025-05-22 19:26:57.547001+03",
    "tool_name": "Some Name..."
  }
]
```  

---

#### `POST /boss/get/inventory`
Request body:
```json
{
  "user_id": "3ikETMC58S4uqjS5ToXnqh6...",
  "boss_id": "3ikETMC58S4uqjS5ToXnqh6...",
  "base_id": "3ikETMC58S4uqjS5ToXnqh6..."
}
```
Response (success):
```json
[
  {
    "tool_name": "Some Name",
    "count": 1,
    "nubmer_used": 1
  }
]
``` 

---

## Referral API

####  `POST /referral/code`
Request body:
```json
{
  "wallet": "3ikETMC58S4uqjS5ToXnqh6z..."
}
```
Response (success):
```json
{
  "code": "c789c9e6"
}
``` 

---

#### `POST /referral/leader_board`
Request body:
```json
{
  "interval": 1,
  "limit": 2
}
```
Response (success):
```json
[
  {
    "referrer": "66b8db38-038a-4007-872c-70e6feceb37f",
    "number_invitees": 1
  },
  {
    "referrer": "38352efe-b983-47d0-b49b-ee33b183d914",
    "number_invitees": 1
  }
]
``` 