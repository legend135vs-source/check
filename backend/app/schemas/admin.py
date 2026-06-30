import uuid
from typing import Optional
from pydantic import BaseModel


class BrandCreate(BaseModel):
    name: str
    country: Optional[str] = None
    logo_url: Optional[str] = None


class BrandResponse(BrandCreate):
    id: uuid.UUID
    model_config = {"from_attributes": True}


class PromptCreate(BaseModel):
    key: str
    description: Optional[str] = None
    template: str
    is_active: bool = True
    model_override: Optional[str] = None
    max_tokens_override: Optional[int] = None


class PromptResponse(PromptCreate):
    id: uuid.UUID
    model_config = {"from_attributes": True}


class StatsResponse(BaseModel):
    total_reports: int
    reports_today: int
    reports_done: int
    reports_failed: int
    avg_risk_score: Optional[float] = None
