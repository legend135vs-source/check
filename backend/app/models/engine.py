import uuid
from sqlalchemy import String, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class Engine(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "engines"

    model_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicle_models.id"), nullable=False)
    fuel_type: Mapped[str] = mapped_column(String(50))
    displacement: Mapped[float | None] = mapped_column(Float)
    power_hp: Mapped[int | None]
    torque_nm: Mapped[int | None]
    transmission: Mapped[str | None] = mapped_column(String(50))
    drive_type: Mapped[str | None] = mapped_column(String(20))
