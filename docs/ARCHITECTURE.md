# Architecture

## Overview
AI Vehicle Inspector follows Clean Architecture with 4 strict layers:

1. **Domain** — Pure entities + interfaces (no framework dependencies)
2. **Application/Services** — Use case orchestration
3. **Infrastructure** — SQLAlchemy, Redis, R2, HTTP clients
4. **Delivery/API** — FastAPI routes (parse request → call service → return response)

## Key Principle
Dependencies always point inward. The domain never imports from infrastructure.

## Module Map
- `app/core/` — Config, DB, DI, logging, middleware
- `app/domain/` — Entities + interfaces (ports)
- `app/models/` — SQLAlchemy ORM models
- `app/schemas/` — Pydantic request/response models
- `app/services/` — Business use cases
- `app/ai/` — AI orchestration (prompt builder, vision, report generator)
- `app/pdf/` — PDF generation (WeasyPrint/ReportLab)
- `app/infrastructure/` — Concrete implementations
- `app/api/v1/` — FastAPI route handlers
