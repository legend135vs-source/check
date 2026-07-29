from fastapi import FastAPI

from app.api.v1.router import api_v1_router

app = FastAPI(
    title="Check API",
    version="1.0.0",
)

@app.get("/")
async def root():
    return {
        "status": "ok",
        "docs": "/docs",
        "health": "/api/v1/health",
    }

app.include_router(api_v1_router, prefix="/api/v1")
