from abc import ABC, abstractmethod
from app.domain.entities.vin_data import VINData


class IVINDecoder(ABC):
    @abstractmethod
    async def decode(self, vin: str) -> VINData:
        ...
