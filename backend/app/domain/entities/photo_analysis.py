from dataclasses import dataclass, field
from typing import Optional


@dataclass
class PhotoAnalysisEntity:
    photo_url: str
    damage_detected: bool = False
    damage_description: Optional[str] = None
    confidence_score: Optional[float] = None
    damage_zones: dict = field(default_factory=dict)
