import uuid
from sqlalchemy import String, Float, ForeignKey, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class PhotoAnalysis(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "photo_analyses"

    report_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    photo_url: Mapped[str] = mapped_column(String(500), nullable=False)
    damage_detected: Mapped[bool] = mapped_column(default=False)
    damage_description: Mapped[str | None] = mapped_column(Text)
    confidence_score: Mapped[float | None] = mapped_column(Float)
    damage_zones: Mapped[dict | None] = mapped_column(JSON)

    report: Mapped["Report"] = relationship("Report", back_populates="photo_analyses")
