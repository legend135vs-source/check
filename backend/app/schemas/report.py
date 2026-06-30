import uuid
from typing import Optional
from pydantic import BaseModel, HttpUrl
from app.models.report import ReportStatus


class ReportCreateRequest(BaseModel):
    vin: Optional[str] = None
    auto_ria_url: Optional[str] = None

    model_config = {
        "json_schema_extra": {
            "example": {"vin": "1HGCM82633A004352"}
        }
    }


class ReportStatusResponse(BaseModel):
    id: uuid.UUID
    status: ReportStatus
    risk_score: Optional[float] = None
    pdf_url: Optional[str] = None
    ai_summary: Optional[str] = None

    model_config = {"from_attributes": True}


class ReportFullResponse(ReportStatusResponse):
    vin: Optional[str] = None
    auto_ria_url: Optional[str] = None
    raw_vin_data: Optional[dict] = None
    raw_auction_data: Optional[dict] = None
