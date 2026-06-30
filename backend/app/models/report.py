import uuid
from sqlalchemy import String, Integer, Float, ForeignKey, Text, JSON, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class ReportStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    DONE = "done"
    FAILED = "failed"


class Report(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "reports"

    vehicle_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"))
    vin: Mapped[str | None] = mapped_column(String(17), index=True)
    auto_ria_url: Mapped[str | None] = mapped_column(String(500))
    status: Mapped[ReportStatus] = mapped_column(Enum(ReportStatus), default=ReportStatus.PENDING, index=True)
    risk_score: Mapped[float | None] = mapped_column(Float)
    pdf_url: Mapped[str | None] = mapped_column(String(500))
    ai_summary: Mapped[str | None] = mapped_column(Text)
    raw_vin_data: Mapped[dict | None] = mapped_column(JSON)
    raw_auction_data: Mapped[dict | None] = mapped_column(JSON)
    error_message: Mapped[str | None] = mapped_column(Text)

    vehicle: Mapped["Vehicle | None"] = relationship("Vehicle", back_populates="reports")
    photo_analyses: Mapped[list["PhotoAnalysis"]] = relationship("PhotoAnalysis", back_populates="report")
    auction_records: Mapped[list["AuctionRecord"]] = relationship("AuctionRecord", back_populates="report")
