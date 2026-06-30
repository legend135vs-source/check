from dataclasses import dataclass
from typing import Optional


@dataclass
class VehicleEntity:
    vin: str
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    color: Optional[str] = None
    mileage_km: Optional[int] = None
