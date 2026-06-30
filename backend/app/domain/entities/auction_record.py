from dataclasses import dataclass
from typing import Optional


@dataclass
class AuctionRecordEntity:
    auction_name: Optional[str]
    lot_number: Optional[str]
    sale_date: Optional[str]
    odometer_km: Optional[int]
    sale_price_usd: Optional[float]
    primary_damage: Optional[str]
    secondary_damage: Optional[str]
    damage_description: Optional[str]
    photos: list = None

    def __post_init__(self):
        if self.photos is None:
            self.photos = []
