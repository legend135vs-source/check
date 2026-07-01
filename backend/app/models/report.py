import uuid
from sqlalchemy import String, Float, Text, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDMixin, TimestampMixin
import enum


class ReportStatus(str, enum.Enum):
    pending = "pending"
    processing = "processing"
    done = "done"
    failed = "failed"


class Report(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "reports"

    vehicle_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"))
    vin: Mapped[str | None] = mapped_column(String(17), nullable=True, index=True)
    auto_ria_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    status: Mapped[ReportStatus] = mapped_column(
        Enum(ReportStatus, name="reportstatus", create_type=False),
        nullable=False,
        default=ReportStatus.pending,
        server_default="pending",
    )
    risk_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    pdf_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    ai_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    raw_vin_data: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    raw_auction_data: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)

    vehicle = relationship("Vehicle", back_populates="reports")
    auction_records = relationship("AuctionRecord", back_populates="report")
    photo_analyses = relationship("PhotoAnalysis", back_populates="report")
