import uuid
import enum
from typing import Any
from sqlalchemy import String, Float, ForeignKey, Text, JSON, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class ReportStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    DONE = "done"
    FAILED = "failed"


class Report(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "reports"

    vehicle_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=True)
    vin: Mapped[str | None] = mapped_column(String(17), index=True, nullable=True)
    auto_ria_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    status: Mapped[ReportStatus] = mapped_column(Enum(ReportStatus), default=ReportStatus.PENDING, index=True)
    risk_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    pdf_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    ai_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    raw_vin_data: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)
    raw_auction_data: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)

    vehicle: Mapped["Vehicle | None"] = relationship("Vehicle", back_populates="reports")
    photo_analyses: Mapped[list["PhotoAnalysis"]] = relationship("PhotoAnalysis", back_populates="report", lazy="select")
    auction_records: Mapped[list["AuctionRecord"]] = relationship("AuctionRecord", back_populates="report", lazy="select")
