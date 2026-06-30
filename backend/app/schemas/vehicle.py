import uuid
from typing import Optional
from pydantic import BaseModel


class VehicleSearchRequest(BaseModel):
    query: str
    year_from: Optional[int] = None
    year_to: Optional[int] = None
    brand: Optional[str] = None


class VehicleResponse(BaseModel):
    id: uuid.UUID
    vin: str
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None

    model_config = {"from_attributes": True}
