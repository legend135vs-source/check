import uuid
from sqlalchemy import String, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class Recall(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "recalls"

    model_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicle_models.id"), nullable=False)
    nhtsa_id: Mapped[str | None] = mapped_column(String(50))
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    consequence: Mapped[str | None] = mapped_column(Text)
    remedy: Mapped[str | None] = mapped_column(Text)
    recall_date: Mapped[str | None] = mapped_column(String(20))
