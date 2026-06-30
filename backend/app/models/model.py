import uuid
from sqlalchemy import String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class VehicleModel(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "vehicle_models"

    brand_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("brands.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    body_type: Mapped[str | None] = mapped_column(String(50))
    year_from: Mapped[int | None]
    year_to: Mapped[int | None]

    brand: Mapped["Brand"] = relationship("Brand", back_populates="models")
    vehicles: Mapped[list["Vehicle"]] = relationship("Vehicle", back_populates="model")
