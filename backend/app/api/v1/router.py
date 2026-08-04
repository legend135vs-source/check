from fastapi import APIRouter

from app.api.v1 import admin, health, photo, vehicle, vin
from app.api.v1 import analysis

api_v1_router = APIRouter()

api_v1_router.include_router(admin.router)
api_v1_router.include_router(health.router)
api_v1_router.include_router(photo.router)
api_v1_router.include_router(vehicle.router)
api_v1_router.include_router(vin.router)
api_v1_router.include_router(analysis.router)
