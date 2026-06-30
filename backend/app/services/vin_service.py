from app.domain.entities.vin_data import VINData
from app.domain.interfaces.i_vin_decoder import IVINDecoder
from app.domain.interfaces.i_cache import ICache


class VINService:
    def __init__(self, decoder: IVINDecoder, cache: ICache):
        self.decoder = decoder
        self.cache = cache

    async def decode(self, vin: str) -> VINData:
        cache_key = f"vin:{vin}"
        cached = await self.cache.get(cache_key)
        if cached:
            return VINData(**cached)
        data = await self.decoder.decode(vin)
        await self.cache.set(cache_key, data.__dict__, ttl=86400)
        return data
