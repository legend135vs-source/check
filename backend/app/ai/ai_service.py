from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.interfaces.i_ai_service import IAIService
from app.domain.entities.report import ReportEntity
from app.domain.entities.photo_analysis import PhotoAnalysisEntity
from app.ai.prompt_builder import PromptBuilder
from app.ai.vision_analyzer import VisionAnalyzer
from app.ai.report_generator import ReportGenerator


class AIService(IAIService):
    def __init__(self, db: AsyncSession):
        self.prompt_builder = PromptBuilder(db)
        self.vision_analyzer = VisionAnalyzer()
        self.report_generator = ReportGenerator(self.prompt_builder)

    async def generate_report(self, report: ReportEntity) -> tuple[str, float]:
        return await self.report_generator.generate(report)

    async def analyze_photos(self, photo_urls: list[str]) -> list[PhotoAnalysisEntity]:
        return await self.vision_analyzer.analyze(photo_urls)
