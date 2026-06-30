import uuid
from app.domain.entities.photo_analysis import PhotoAnalysisEntity
from app.domain.interfaces.i_ai_service import IAIService
from app.domain.interfaces.i_storage import IStorage


class PhotoService:
    def __init__(self, ai_service: IAIService, storage: IStorage):
        self.ai = ai_service
        self.storage = storage

    async def upload_and_analyze(self, photo_bytes: bytes, filename: str) -> PhotoAnalysisEntity:
        key = f"photos/{uuid.uuid4()}/{filename}"
        url = await self.storage.upload(key, photo_bytes, content_type="image/jpeg")
        analyses = await self.ai.analyze_photos([url])
        return analyses[0] if analyses else PhotoAnalysisEntity(photo_url=url)
