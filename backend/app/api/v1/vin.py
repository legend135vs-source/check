from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_db
from app.schemas.vin import VINDecodeResponse
from app.services.vin_service import VINService
from app.infrastructure.external.vin_decoder_client import NHTSAVINDecoder
from app.infrastructure.cache.redis_cache import RedisCache

router = APIRouter()


def get_vin_service() -> VINService:
    return VINService(decoder=NHTSAVINDecoder(), cache=RedisCache())


@router.get("/{vin}", response_model=VINDecodeResponse)
async def decode_vin(vin: str, service: VINService = Depends(get_vin_service)):
    data = await service.decode(vin)
    return VINDecodeResponse(**data.__dict__)
