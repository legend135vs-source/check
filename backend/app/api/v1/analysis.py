from fastapi import APIRouter, HTTPException, status

from app.schemas.analysis import AnalysisApiResponse, AnalysisRequest
from app.services.ai.report_generator import AIReportGenerator
from app.services.autoria.service import AutoRiaService

router = APIRouter(prefix="/analysis", tags=["Analysis"])

_ANALYSIS_STORE: dict[str, AnalysisApiResponse] = {}


def _to_api_response(advertisement, report) -> AnalysisApiResponse:
    summary = report.final_conclusion or report.overall_assessment
    risk_preview = report.risks[0] if report.risks else None
    detailed_parts = [report.overall_assessment, report.final_conclusion]
    detailed_analysis = "\n\n".join(part for part in detailed_parts if part) or None

    return AnalysisApiResponse(
        stage="pro",
        analysis_id=str(advertisement.auto_id),
        brand=advertisement.mark_name,
        model=advertisement.model_name,
        year=advertisement.year,
        mileage=advertisement.mileage_km,
        price_usd=advertisement.price_usd,
        summary=summary,
        risk_preview=risk_preview,
        recommendation=report.overall_assessment,
        pros=report.pros,
        cons=report.cons,
        risks=report.risks,
        detailed_analysis=detailed_analysis,
    )


@router.post("", response_model=AnalysisApiResponse)
async def analyze_autoria_listing(payload: AnalysisRequest) -> AnalysisApiResponse:
    autoria_service = AutoRiaService()
    advertisement = await autoria_service.get_advertisement_by_url(str(payload.url))

    ai_service = AIReportGenerator()
    report = await ai_service.generate(advertisement)

    response = _to_api_response(advertisement, report)
    _ANALYSIS_STORE[response.analysis_id] = response
    return response


@router.get("/{analysis_id}", response_model=AnalysisApiResponse)
async def get_analysis(analysis_id: str) -> AnalysisApiResponse:
    analysis = _ANALYSIS_STORE.get(analysis_id)
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found",
        )
    return analysis
