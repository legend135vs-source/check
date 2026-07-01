import uuid
from sqlalchemy import String, Float, Text, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDMixin, TimestampMixin


class PhotoAnalysis(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "photo_analyses"

    report_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    photo_url: Mapped[str] = mapped_column(String(500), nullable=False)
    storage_key: Mapped[str | None] = mapped_column(String(300), nullable=True)
    damage_detected: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False, server_default="false")
    damage_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    confidence_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    ai_raw_response: Mapped[dict | None] = mapped_column(JSON, nullable=True)

    report = relationship("Report", back_populates="photo_analyses")
