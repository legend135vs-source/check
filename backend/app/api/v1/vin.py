from fastapi import APIRouter, HTTPException

from app.services.vin_service import VINService

router = APIRouter(prefix="/vin", tags=["VIN"])


@router.get("/{vin}")
async def decode_vin(vin: str):
    normalized_vin = vin.strip().upper()

    if len(normalized_vin) != 17:
        raise HTTPException(status_code=422, detail="VIN має містити 17 символів")

    service = VINService()
    return await service.decode(normalized_vin)
