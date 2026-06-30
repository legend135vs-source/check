import uuid
from typing import Any
from sqlalchemy import String, Float, ForeignKey, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class AuctionRecord(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "auction_records"

    report_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    auction_name: Mapped[str | None] = mapped_column(String(100))
    lot_number: Mapped[str | None] = mapped_column(String(50))
    sale_date: Mapped[str | None] = mapped_column(String(20))
    odometer_km: Mapped[int | None] = mapped_column(nullable=True)
    sale_price_usd: Mapped[float | None] = mapped_column(Float, nullable=True)
    damage_description: Mapped[str | None] = mapped_column(Text)
    primary_damage: Mapped[str | None] = mapped_column(String(100))
    secondary_damage: Mapped[str | None] = mapped_column(String(100))
    photos: Mapped[list[Any] | None] = mapped_column(JSON, nullable=True)

    report: Mapped["Report"] = relationship("Report", back_populates="auction_records")
