import uuid
from sqlalchemy import String, Integer, Float, ForeignKey, Date, Text
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
    odometer_km: Mapped[int | None]
    sale_price_usd: Mapped[float | None] = mapped_column(Float)
    damage_description: Mapped[str | None] = mapped_column(Text)
    primary_damage: Mapped[str | None] = mapped_column(String(100))
    secondary_damage: Mapped[str | None] = mapped_column(String(100))
    photos: Mapped[list | None] = mapped_column()

    report: Mapped["Report"] = relationship("Report", back_populates="auction_records")
