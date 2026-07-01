from sqlalchemy import String, Float, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base, UUIDMixin, TimestampMixin


class Pricing(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "pricing"

    name: Mapped[str] = mapped_column(String(100), nullable=False)
    price_usd: Mapped[float] = mapped_column(Float, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, server_default="true")
