# Deployment Guide — Railway

## Prerequisites
1. Railway account at railway.app
2. GitHub repository connected

## Steps
1. Create new Railway project
2. Add PostgreSQL plugin
3. Add Redis plugin
4. Deploy from GitHub (backend + frontend services defined in railway.toml)
5. Set environment variables from .env.example in Railway dashboard
6. Migrations run automatically on backend start

## Environment Variables
Set all variables from `.env.example` in Railway → Variables tab for each service.
