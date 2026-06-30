from abc import ABC, abstractmethod
from typing import Optional
import uuid
from app.models.report import Report


class IReportRepository(ABC):
    @abstractmethod
    async def create(self, **kwargs) -> Report:
        ...

    @abstractmethod
    async def get_by_id(self, report_id: uuid.UUID) -> Optional[Report]:
        ...

    @abstractmethod
    async def update(self, report_id: uuid.UUID, **kwargs) -> Optional[Report]:
        ...
