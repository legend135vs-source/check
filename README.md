# AI Vehicle Inspector

Production-ready AI-powered vehicle inspection platform.

## Stack
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** FastAPI, Python 3.13, SQLAlchemy, Alembic
- **Database:** PostgreSQL (Railway)
- **Storage:** Cloudflare R2
- **AI:** OpenAI API (GPT-4o + Vision)
- **PDF:** WeasyPrint / ReportLab
- **Deploy:** Railway

## Quick Start

```bash
cp .env.example .env
cd docker && docker-compose up -d postgres redis
cd ../backend && pip install -r requirements.txt && alembic upgrade head && uvicorn app.main:app --reload
cd ../frontend && npm install && npm run dev
```

## Docs
- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Database Schema](docs/DATABASE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
