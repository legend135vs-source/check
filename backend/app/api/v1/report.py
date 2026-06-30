import uuid
import asyncio
from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_db
from app.core.exceptions import ReportNotFoundError
from app.schemas.report import ReportCreateRequest, ReportStatusResponse
from app.services.report_service import ReportService
from app.infrastructure.repositories.report_repository import ReportRepository
from app.services.vin_service import VINService
from app.services.auction_service import AuctionService
from app.ai.ai_service import AIService
from app.pdf.pdf_generator import PDFGenerator
from app.infrastructure.storage.r2_storage import R2Storage
from app.infrastructure.cache.redis_cache import RedisCache
from app.infrastructure.external.vin_decoder_client import NHTSAVINDecoder
from app.infrastructure.external.auto_ria_client import AutoRiaClient

router = APIRouter()


def get_report_service(db: AsyncSession) -> ReportService:
    cache = RedisCache()
    return ReportService(
        report_repo=ReportRepository(db),
        vin_service=VINService(NHTSAVINDecoder(), cache),
        auction_service=AuctionService(AutoRiaClient(), cache),
        ai_service=AIService(db),
        pdf_generator=PDFGenerator(),
        storage=R2Storage(),
    )


@router.post("", response_model=ReportStatusResponse, status_code=202)
async def create_report(
    body: ReportCreateRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    service = get_report_service(db)
    report_id = await service.create_report(body.vin, body.auto_ria_url)
    background_tasks.add_task(service.process_report, report_id)
    report = await service.repo.get_by_id(report_id)
    return ReportStatusResponse.model_validate(report)


@router.get("/{report_id}", response_model=ReportStatusResponse)
async def get_report(report_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    service = get_report_service(db)
    report = await service.repo.get_by_id(report_id)
    if not report:
        raise ReportNotFoundError(str(report_id))
    return ReportStatusResponse.model_validate(report)
