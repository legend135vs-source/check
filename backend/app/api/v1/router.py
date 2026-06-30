from fastapi import APIRouter
from app.api.v1 import report, vin, photo, vehicle, admin, health
from app.core.config import settings

api_v1_router = APIRouter()

api_v1_router.include_router(health.router, tags=["Health"])
api_v1_router.include_router(report.router, prefix="/report", tags=["Report"])
api_v1_router.include_router(vin.router, prefix="/vin", tags=["VIN"])
api_v1_router.include_router(photo.router, prefix="/photo", tags=["Photo"])
api_v1_router.include_router(vehicle.router, prefix="/vehicle", tags=["Vehicle"])
api_v1_router.include_router(
    admin.router,
    prefix=f"/{settings.ADMIN_SECRET_PATH}",
    tags=["Admin"],
)
