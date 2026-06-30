from sqlalchemy import String, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class AIPrompt(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "ai_prompts"

    key: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(String(300))
    template: Mapped[str] = mapped_column(Text, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    model_override: Mapped[str | None] = mapped_column(String(50))
    max_tokens_override: Mapped[int | None]
