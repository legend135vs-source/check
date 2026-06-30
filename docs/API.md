# API Reference v1

Base URL: `/api/v1`

## Health
`GET /health` — Returns `{status: ok}`

## Report
`POST /report` — Create a new report (async, returns 202)
Body: `{vin?: string, auto_ria_url?: string}`

`GET /report/{id}` — Poll report status
Returns: `{id, status, risk_score, pdf_url, ai_summary}`

## VIN
`GET /vin/{vin}` — Decode a VIN

## Photo
`POST /photo/analyze` — Upload photos for AI damage analysis
Form data: multiple image files

## Vehicle
`GET /vehicle/search?q=` — Search vehicle database

## Admin (hidden route)
All CRUD routes at `/{ADMIN_SECRET_PATH}/`
- `GET/POST /brands`
- `GET/POST /prompts`
- `GET /stats`
