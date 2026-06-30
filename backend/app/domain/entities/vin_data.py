from dataclasses import dataclass, field
from typing import Optional


@dataclass
class VINData:
    vin: str
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    body_type: Optional[str] = None
    engine: Optional[str] = None
    fuel_type: Optional[str] = None
    transmission: Optional[str] = None
    drive_type: Optional[str] = None
    country_of_manufacture: Optional[str] = None
    extra: dict = field(default_factory=dict)
