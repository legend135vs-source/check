from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.ai_prompt import AIPrompt
from app.domain.entities.report import ReportEntity
import os


class PromptBuilder:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def build(self, key: str, context: dict) -> str:
        template = await self._load_template(key)
        return template.format(**context)

    async def _load_template(self, key: str) -> str:
        result = await self.db.execute(
            select(AIPrompt).where(AIPrompt.key == key, AIPrompt.is_active == True)
        )
        prompt = result.scalar_one_or_none()
        if prompt:
            return prompt.template
        return self._load_file_template(key)

    def _load_file_template(self, key: str) -> str:
        path = os.path.join(os.path.dirname(__file__), "templates", f"{key}.txt")
        if os.path.exists(path):
            with open(path) as f:
                return f.read()
        raise ValueError(f"Prompt template '{key}' not found in DB or filesystem.")
