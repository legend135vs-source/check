from abc import ABC, abstractmethod
from app.domain.entities.report import ReportEntity


class IAIService(ABC):
    @abstractmethod
    async def generate_report(self, report: ReportEntity) -> str:
        ...

    @abstractmethod
    async def analyze_photos(self, photo_urls: list[str]) -> list[dict]:
        ...
