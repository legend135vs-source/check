from fastapi import APIRouter, UploadFile, File
from app.schemas.photo import PhotoAnalysisResponse
from app.services.photo_service import PhotoService
from app.ai.ai_service import AIService
from app.infrastructure.storage.r2_storage import R2Storage
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from app.core.dependencies import get_db

router = APIRouter()


@router.post("/analyze", response_model=list[PhotoAnalysisResponse])
async def analyze_photos(
    files: list[UploadFile] = File(...),
    db: AsyncSession = Depends(get_db),
):
    ai_service = AIService(db)
    storage = R2Storage()
    photo_service = PhotoService(ai_service=ai_service, storage=storage)
    results = []
    for file in files:
        data = await file.read()
        result = await photo_service.upload_and_analyze(data, file.filename or "photo.jpg")
        results.append(PhotoAnalysisResponse(
            photo_url=result.photo_url,
            damage_detected=result.damage_detected,
            damage_description=result.damage_description,
            confidence_score=result.confidence_score,
            damage_zones=result.damage_zones,
        ))
    return results
