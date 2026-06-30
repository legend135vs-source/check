from abc import ABC, abstractmethod
from app.domain.entities.auction_record import AuctionRecordEntity


class IAuctionService(ABC):
    @abstractmethod
    async def get_history(self, vin: str) -> list[AuctionRecordEntity]:
        ...
