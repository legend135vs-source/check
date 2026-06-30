import httpx
from app.domain.entities.auction_record import AuctionRecordEntity
from app.domain.interfaces.i_auction_service import IAuctionService
from app.core.config import settings
from app.core.exceptions import ExternalAPIError


class AutoRiaClient(IAuctionService):
    async def get_history(self, vin: str) -> list[AuctionRecordEntity]:
        """
        Auto.ria does not have a public VIN history endpoint.
        This is a placeholder for custom integration.
        Replace with actual Auto.ria API calls per your subscription.
        """
        return []
