from abc import ABC, abstractmethod
from app.domain.entities.report import ReportEntity


class IPDFGenerator(ABC):
    @abstractmethod
    async def generate(self, report: ReportEntity) -> bytes:
        ...
