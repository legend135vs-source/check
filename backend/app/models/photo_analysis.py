import uuid
from typing import Any
from sqlalchemy import String, Float, ForeignKey, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class PhotoAnalysis(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "photo_analyses"

    report_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    photo_url: Mapped[str] = mapped_column(String(500), nullable=False)
    storage_key: Mapped[str | None] = mapped_column(String(300), nullable=True)
    damage_detected: Mapped[bool] = mapped_column(default=False)
    damage_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    confidence_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    ai_raw_response: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)

    report: Mapped["Report"] = relationship("Report", back_populates="photo_analyses")
