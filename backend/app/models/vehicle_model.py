import uuid
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDMixin, TimestampMixin


class VehicleModel(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "vehicle_models"

    brand_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("brands.id"))
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    slug: Mapped[str] = mapped_column(String(100), nullable=False)
    body_type: Mapped[str | None] = mapped_column(String(50), nullable=True)
    year_from: Mapped[int | None] = mapped_column(Integer, nullable=True)
    year_to: Mapped[int | None] = mapped_column(Integer, nullable=True)

    brand = relationship("Brand", back_populates="models")
    vehicles = relationship("Vehicle", back_populates="model")
    engines = relationship("Engine", back_populates="model")
    maintenance = relationship("Maintenance", back_populates="model")
    problems = relationship("Problem", back_populates="model")
    recalls = relationship("Recall", back_populates="model")
