from fastapi import APIRouter

from app.api.v1 import admin, health, photo, report, vehicle, vin


api_v1_router = APIRouter()

api_v1_router.include_router(health.router, tags=["Health"])
api_v1_router.include_router(vin.router, prefix="/vin", tags=["VIN"])
api_v1_router.include_router(vehicle.router, prefix="/vehicles", tags=["Vehicles"])
api_v1_router.include_router(report.router, prefix="/reports", tags=["Reports"])
api_v1_router.include_router(photo.router, prefix="/photos", tags=["Photos"])
api_v1_router.include_router(admin.router, prefix="/admin", tags=["Admin"])