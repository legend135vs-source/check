from app.domain.entities.vin_data import VINData
from app.domain.interfaces.i_cache import ICache
from app.domain.interfaces.i_vin_decoder import IVINDecoder

VIN_CACHE_TTL_SECONDS = 60 * 60 * 24 * 30  # 30 днів — VIN-дані незмінні


class VINService:
    def __init__(self, decoder: IVINDecoder, cache: ICache):
        self.decoder = decoder
        self.cache = cache

    async def decode(self, vin: str) -> VINData:
        normalized_vin = self._normalize(vin)
        cache_key = self._cache_key(normalized_vin)

        cached = await self._get_cached(cache_key)
        if cached is not None:
            return VINData(**cached)

        data = await self.decoder.decode(normalized_vin)
        await self._set_cached(cache_key, data)

        return data

    @staticmethod
    def _normalize(vin: str) -> str:
        return vin.strip().upper().replace(" ", "").replace("-", "")

    @staticmethod
    def _cache_key(vin: str) -> str:
        return f"vin:{vin}"

    async def _get_cached(self, cache_key: str) -> dict | None:
        try:
            return await self.cache.get(cache_key)
        except Exception:
            # Кеш недоступний — не блокуємо перевірку VIN через це.
            return None

    async def _set_cached(self, cache_key: str, data: VINData) -> None:
        try:
            await self.cache.set(
                cache_key,
                data.__dict__,
                ttl=VIN_CACHE_TTL_SECONDS,
            )
        except Exception:
            # Якщо Redis лежить, це не має ламати основний флоу перевірки.
            pass
