import uuid
from sqlalchemy import String, Integer, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class Maintenance(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "maintenance_schedules"

    model_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicle_models.id"), nullable=False)
    interval_km: Mapped[int | None]
    interval_months: Mapped[int | None]
    service_type: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    cost_estimate_usd: Mapped[float | None]
