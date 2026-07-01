import uuid
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDMixin, TimestampMixin


class Vehicle(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "vehicles"

    vin: Mapped[str] = mapped_column(String(17), nullable=False, unique=True, index=True)
    model_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicle_models.id"))
    year: Mapped[int | None] = mapped_column(Integer, nullable=True)
    color: Mapped[str | None] = mapped_column(String(50), nullable=True)
    mileage_km: Mapped[int | None] = mapped_column(Integer, nullable=True)
    country_of_origin: Mapped[str | None] = mapped_column(String(100), nullable=True)
    extra_data: Mapped[dict | None] = mapped_column(JSON, nullable=True)

    model = relationship("VehicleModel", back_populates="vehicles")
    reports = relationship("Report", back_populates="vehicle")
