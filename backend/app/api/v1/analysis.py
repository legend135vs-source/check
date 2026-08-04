from fastapi import APIRouter

from app.schemas.analysis import AnalysisRequest, AnalysisResponse
from app.services.ai.report_generator import AIReportGenerator
from app.services.autoria.service import AutoRiaService

router = APIRouter(prefix="/analysis", tags=["Analysis"])


@router.post("", response_model=AnalysisResponse)
async def analyze_autoria_listing(payload: AnalysisRequest) -> AnalysisResponse:
    autoria_service = AutoRiaService()
    advertisement = await autoria_service.get_advertisement_by_url(str(payload.url))

    ai_service = AIReportGenerator()
    report = await ai_service.generate(advertisement)

    return AnalysisResponse(
        auto_id=advertisement.auto_id,
        advertisement=advertisement,
        report=report,
    )
