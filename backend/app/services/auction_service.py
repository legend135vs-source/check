from app.domain.entities.auction_record import AuctionRecordEntity
from app.domain.interfaces.i_auction_service import IAuctionService
from app.domain.interfaces.i_cache import ICache


class AuctionService:
    def __init__(self, auction_client: IAuctionService, cache: ICache):
        self.client = auction_client
        self.cache = cache

    async def get_history(self, vin: str) -> list[AuctionRecordEntity]:
        cache_key = f"auction:{vin}"
        cached = await self.cache.get(cache_key)
        if cached:
            return [AuctionRecordEntity(**r) for r in cached]
        records = await self.client.get_history(vin)
        await self.cache.set(cache_key, [r.__dict__ for r in records], ttl=21600)
        return records
