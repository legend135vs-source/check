"""TTL cache with Redis backend and in-memory fallback.

Redis is used when REDIS_URL is configured and the `redis` package is
available. Otherwise a local in-memory cache is used, so the service keeps
working (just without cross-instance caching).
"""

import logging
import time
from typing import Any

from app.core.config import settings

logger = logging.getLogger(__name__)

try:  # optional dependency
    import redis.asyncio as aioredis  # type: ignore

    _REDIS_AVAILABLE = True
except Exception:  # pragma: no cover - defensive
    aioredis = None  # type: ignore
    _REDIS_AVAILABLE = False


class TTLCache:
    def __init__(self) -> None:
        self._redis: Any = None
        self._redis_failed = False
        self._memory: dict[str, tuple[float, str]] = {}

    async def _get_redis(self):
        if self._redis is not None or self._redis_failed:
            return self._redis
        if not _REDIS_AVAILABLE or not settings.REDIS_URL:
            return None
        try:
            self._redis = aioredis.from_url(settings.REDIS_URL, decode_responses=True)
            await self._redis.ping()
            logger.info("TTLCache: Redis backend ready")
            return self._redis
        except Exception as exc:  # pragma: no cover - defensive
            logger.warning("TTLCache: Redis unavailable, using memory fallback: %s", exc)
            self._redis_failed = True
            self._redis = None
            return None

    async def get(self, key: str) -> str | None:
        client = await self._get_redis()
        if client is not None:
            try:
                return await client.get(key)
            except Exception as exc:  # pragma: no cover - defensive
                logger.warning("TTLCache: Redis get failed: %s", exc)

        entry = self._memory.get(key)
        if entry is None:
            return None
        expires_at, value = entry
        if expires_at < time.time():
            self._memory.pop(key, None)
            return None
        return value

    async def set(self, key: str, value: str, ttl_seconds: int) -> None:
        client = await self._get_redis()
        if client is not None:
            try:
                await client.set(key, value, ex=ttl_seconds)
                return
            except Exception as exc:  # pragma: no cover - defensive
                logger.warning("TTLCache: Redis set failed: %s", exc)

        self._memory[key] = (time.time() + ttl_seconds, value)


cache = TTLCache()
