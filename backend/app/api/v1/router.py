from fastapi import APIRouter

from app.api.v1 import health, vin

api_v1_router = APIRouter()

api_v1_router.include_router(
    health.router,
    prefix="/health",
    tags=["Health"],
)

api_v1_router.include_router(
    vin.router,
    prefix="/vin",
    tags=["VIN"],
)
