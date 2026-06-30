import uuid
from typing import Any
from sqlalchemy import String, Integer, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class Vehicle(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "vehicles"

    vin: Mapped[str] = mapped_column(String(17), unique=True, nullable=False, index=True)
    model_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicle_models.id"), nullable=True)
    year: Mapped[int | None] = mapped_column(Integer, nullable=True)
    color: Mapped[str | None] = mapped_column(String(50), nullable=True)
    mileage_km: Mapped[int | None] = mapped_column(Integer, nullable=True)
    country_of_origin: Mapped[str | None] = mapped_column(String(100), nullable=True)
    extra_data: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)

    model: Mapped["VehicleModel | None"] = relationship("VehicleModel", back_populates="vehicles")
    reports: Mapped[list["Report"]] = relationship("Report", back_populates="vehicle", lazy="select")
