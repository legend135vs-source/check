from fastapi import APIRouter

from app.schemas.analysis import AnalysisRequest, AnalysisResponse, AnalysisReport
from app.services.autoria.service import AutoRiaService

router = APIRouter(prefix="/analysis", tags=["Analysis"])


@router.post("", response_model=AnalysisResponse)
async def analyze_autoria_listing(payload: AnalysisRequest) -> AnalysisResponse:
    service = AutoRiaService()
    advertisement = await service.get_advertisement_by_url(str(payload.url))

    report = AnalysisReport(
        overall_assessment="Чернетка: AI-звіт буде підключений наступним кроком.",
        pros=[],
        cons=[],
        risks=[],
        common_issues=[],
        photo_analysis=[],
        description_analysis=[],
        expected_costs=[],
        questions_to_seller=[],
        service_checklist=[],
        final_conclusion=None,
    )

    return AnalysisResponse(
        auto_id=advertisement.auto_id,
        advertisement=advertisement,
        report=report,
    )
