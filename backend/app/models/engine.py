import uuid
from sqlalchemy import String, Integer, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDMixin, TimestampMixin


class Engine(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "engines"

    model_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicle_models.id"))
    code: Mapped[str | None] = mapped_column(String(50), nullable=True)
    displacement_cc: Mapped[int | None] = mapped_column(Integer, nullable=True)
    power_hp: Mapped[int | None] = mapped_column(Integer, nullable=True)
    fuel_type: Mapped[str | None] = mapped_column(String(30), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    model = relationship("VehicleModel", back_populates="engines")
