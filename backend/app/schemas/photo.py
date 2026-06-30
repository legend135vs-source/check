from typing import Optional
from pydantic import BaseModel


class PhotoAnalysisResponse(BaseModel):
    photo_url: str
    damage_detected: bool
    damage_description: Optional[str] = None
    confidence_score: Optional[float] = None
    damage_zones: Optional[dict] = None
