"""Persistent storage for analysis results.

Uses Postgres (via asyncpg) when DATABASE_URL is available, with automatic
table creation and a safe in-memory fallback so the service never fails to
start because of storage issues.
"""

import asyncio
import logging

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine

from app.core.config import settings
from app.schemas.analysis import AnalysisApiResponse

logger = logging.getLogger(__name__)

_CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS analyses (
    analysis_id TEXT PRIMARY KEY,
    auto_id BIGINT,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
"""


def _normalize_database_url(url: str) -> str:
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+asyncpg://", 1)
    if url.startswith("postgresql://") and "+asyncpg" not in url:
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
    return url


class AnalysisStore:
    """Postgres-backed analysis store with in-memory fallback."""

    def __init__(self) -> None:
        self._engine: AsyncEngine | None = None
        self._init_lock = asyncio.Lock()
        self._ready = False
        self._disabled = False
        self._memory: dict[str, AnalysisApiResponse] = {}

    async def _ensure_engine(self) -> AsyncEngine | None:
        if self._disabled:
            return None
        if self._engine is not None and self._ready:
            return self._engine

        async with self._init_lock:
            if self._engine is not None and self._ready:
                return self._engine
            if self._disabled:
                return None
            try:
                if self._engine is None:
                    self._engine = create_async_engine(
                        _normalize_database_url(settings.DATABASE_URL),
                        pool_pre_ping=True,
                        pool_size=3,
                        max_overflow=2,
                    )
                async with self._engine.begin() as conn:
                    await conn.execute(text(_CREATE_TABLE_SQL))
                self._ready = True
                logger.info("AnalysisStore: Postgres storage ready")
                return self._engine
            except Exception as exc:  # pragma: no cover - defensive
                logger.warning("AnalysisStore: Postgres unavailable, using memory fallback: %s", exc)
                self._disabled = True
                return None

    async def save(self, response: AnalysisApiResponse) -> None:
        self._memory[response.analysis_id] = response

        engine = await self._ensure_engine()
        if engine is None:
            return
        try:
            async with engine.begin() as conn:
                await conn.execute(
                    text(
                        "INSERT INTO analyses (analysis_id, auto_id, payload) "
                        "VALUES (:analysis_id, :auto_id, CAST(:payload AS JSONB)) "
                        "ON CONFLICT (analysis_id) DO UPDATE SET payload = EXCLUDED.payload"
                    ),
                    {
                        "analysis_id": response.analysis_id,
                        "auto_id": int(response.analysis_id) if response.analysis_id.isdigit() else None,
                        "payload": response.model_dump_json(),
                    },
                )
        except Exception as exc:  # pragma: no cover - defensive
            logger.warning("AnalysisStore: failed to persist analysis %s: %s", response.analysis_id, exc)

    async def get(self, analysis_id: str) -> AnalysisApiResponse | None:
        engine = await self._ensure_engine()
        if engine is not None:
            try:
                async with engine.connect() as conn:
                    result = await conn.execute(
                        text("SELECT payload FROM analyses WHERE analysis_id = :analysis_id"),
                        {"analysis_id": analysis_id},
                    )
                    row = result.first()
                    if row is not None:
                        payload = row[0]
                        if isinstance(payload, str):
                            return AnalysisApiResponse.model_validate_json(payload)
                        return AnalysisApiResponse.model_validate(payload)
            except Exception as exc:  # pragma: no cover - defensive
                logger.warning("AnalysisStore: failed to load analysis %s: %s", analysis_id, exc)

        return self._memory.get(analysis_id)


analysis_store = AnalysisStore()
