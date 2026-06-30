from dataclasses import dataclass, field
from typing import Optional
from app.domain.entities.vin_data import VINData
from app.domain.entities.auction_record import AuctionRecordEntity
from app.domain.entities.photo_analysis import PhotoAnalysisEntity


@dataclass
class ReportEntity:
    vin: Optional[str]
    auto_ria_url: Optional[str]
    vin_data: Optional[VINData] = None
    auction_records: list[AuctionRecordEntity] = field(default_factory=list)
    photo_analyses: list[PhotoAnalysisEntity] = field(default_factory=list)
    ai_summary: Optional[str] = None
    risk_score: Optional[float] = None
    pdf_url: Optional[str] = None
