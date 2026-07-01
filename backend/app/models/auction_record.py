import uuid
from sqlalchemy import String, Integer, Float, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDMixin, TimestampMixin


class AuctionRecord(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "auction_records"

    report_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    auction_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    lot_number: Mapped[str | None] = mapped_column(String(50), nullable=True)
    sale_date: Mapped[str | None] = mapped_column(String(20), nullable=True)
    odometer_km: Mapped[int | None] = mapped_column(Integer, nullable=True)
    sale_price_usd: Mapped[float | None] = mapped_column(Float, nullable=True)
    damage_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    primary_damage: Mapped[str | None] = mapped_column(String(100), nullable=True)
    secondary_damage: Mapped[str | None] = mapped_column(String(100), nullable=True)
    photos: Mapped[list | None] = mapped_column(JSON, nullable=True)

    report = relationship("Report", back_populates="auction_records")
