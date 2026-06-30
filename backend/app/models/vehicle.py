import uuid
from sqlalchemy import String, Integer, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class Vehicle(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "vehicles"

    vin: Mapped[str] = mapped_column(String(17), unique=True, nullable=False, index=True)
    model_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicle_models.id"))
    year: Mapped[int | None] = mapped_column(Integer)
    color: Mapped[str | None] = mapped_column(String(50))
    mileage_km: Mapped[int | None]
    country_of_origin: Mapped[str | None] = mapped_column(String(100))
    extra_data: Mapped[dict | None] = mapped_column(JSON)

    model: Mapped["VehicleModel | None"] = relationship("VehicleModel", back_populates="vehicles")
    reports: Mapped[list["Report"]] = relationship("Report", back_populates="vehicle")
