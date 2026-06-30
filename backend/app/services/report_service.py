import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.entities.report import ReportEntity
from app.domain.interfaces.i_cache import ICache
from app.domain.interfaces.i_storage import IStorage
from app.domain.interfaces.i_ai_service import IAIService
from app.domain.interfaces.i_pdf_generator import IPDFGenerator
from app.domain.interfaces.i_report_repository import IReportRepository
from app.services.vin_service import VINService
from app.services.auction_service import AuctionService
from app.models.report import ReportStatus
from app.core.logging import logger


class ReportService:
    def __init__(
        self,
        report_repo: IReportRepository,
        vin_service: VINService,
        auction_service: AuctionService,
        ai_service: IAIService,
        pdf_generator: IPDFGenerator,
        storage: IStorage,
    ):
        self.repo = report_repo
        self.vin_service = vin_service
        self.auction_service = auction_service
        self.ai = ai_service
        self.pdf = pdf_generator
        self.storage = storage

    async def create_report(self, vin: str | None, auto_ria_url: str | None) -> uuid.UUID:
        report = await self.repo.create(
            vin=vin,
            auto_ria_url=auto_ria_url,
            status=ReportStatus.PENDING,
        )
        return report.id

    async def process_report(self, report_id: uuid.UUID) -> None:
        await self.repo.update(report_id, status=ReportStatus.PROCESSING)
        try:
            report_record = await self.repo.get_by_id(report_id)
            vin = report_record.vin

            entity = ReportEntity(vin=vin, auto_ria_url=report_record.auto_ria_url)

            if vin:
                entity.vin_data = await self.vin_service.decode(vin)
                entity.auction_records = await self.auction_service.get_history(vin)

            ai_summary, risk_score = await self.ai.generate_report(entity)
            entity.ai_summary = ai_summary
            entity.risk_score = risk_score

            pdf_bytes = await self.pdf.generate(entity)
            pdf_key = f"reports/{report_id}/report.pdf"
            pdf_url = await self.storage.upload(pdf_key, pdf_bytes, content_type="application/pdf")

            await self.repo.update(
                report_id,
                status=ReportStatus.DONE,
                ai_summary=ai_summary,
                risk_score=risk_score,
                pdf_url=pdf_url,
                raw_vin_data=entity.vin_data.__dict__ if entity.vin_data else None,
            )
            logger.info(f"Report {report_id} completed. Risk: {risk_score}")
        except Exception as e:
            logger.error(f"Report {report_id} failed: {e}")
            await self.repo.update(report_id, status=ReportStatus.FAILED, error_message=str(e))
            raise
