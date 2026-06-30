# Database Schema

## Tables
- `brands` — Vehicle manufacturers
- `vehicle_models` — Models per brand
- `engines` — Engine specs per model
- `vehicles` — Individual vehicles (VIN)
- `reports` — Inspection reports (status, risk_score, pdf_url)
- `auction_records` — Auction history per report
- `photo_analyses` — AI photo analysis results
- `ai_prompts` — Editable AI prompt templates
- `known_problems` — Common issues per model
- `recalls` — NHTSA recalls per model
- `maintenance_schedules` — Service intervals per model
- `pricing` — Report pricing tiers
- `request_logs` — API request audit log

## Design Decisions
- All PKs are UUID v4
- All tables have `created_at` / `updated_at` timestamps
- `reports.status` enum: pending → processing → done | failed
