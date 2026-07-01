import uuid
from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDMixin, TimestampMixin


class Recall(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "recalls"

    model_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicle_models.id"))
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    recall_date: Mapped[str | None] = mapped_column(String(20), nullable=True)
    nhtsa_id: Mapped[str | None] = mapped_column(String(50), nullable=True)

    model = relationship("VehicleModel", back_populates="recalls")
