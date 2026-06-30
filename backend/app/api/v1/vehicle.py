from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_db
from app.schemas.vehicle import VehicleResponse
from app.services.vehicle_service import VehicleService

router = APIRouter()


@router.get("/search", response_model=list[VehicleResponse])
async def search_vehicles(
    q: str = Query(..., min_length=2),
    db: AsyncSession = Depends(get_db),
):
    service = VehicleService(db)
    vehicles = await service.search(q)
    return [VehicleResponse.model_validate(v) for v in vehicles]
