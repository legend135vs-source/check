import hashlib

from fastapi import APIRouter, HTTPException, Request, status

from app.core.config import settings
from app.core.exceptions import ExternalAPIError, ValidationError
from app.schemas.analysis import AdvertisementData, AnalysisApiResponse, AnalysisRequest
from app.services.ai.report_generator import AIReportGenerator
from app.services.analysis_store import analysis_store
from app.services.autoria.service import AutoRiaService
from app.services.cache import cache
from app.services.rate_limiter import SlidingWindowRateLimiter

router = APIRouter(prefix="/analysis", tags=["Analysis"])

_analysis_rate_limiter = SlidingWindowRateLimiter(
    limit=settings.RATE_LIMIT_ANALYSIS_PER_HOUR,
    window_seconds=3600,
)


def _client_key(request: Request) -> str:
    session_id = request.headers.get("x-session-id")
    if session_id:
        return f"session:{session_id}"
    client_host = request.client.host if request.client else "unknown"
    return f"ip:{client_host}"


def _cache_key(url: str) -> str:
    digest = hashlib.sha256(url.encode("utf-8")).hexdigest()[:24]
    return f"autoria:ad:{digest}"


async def _get_advertisement(url: str) -> AdvertisementData:
    key = _cache_key(url)
    cached = await cache.get(key)
    if cached:
        return AdvertisementData.model_validate_json(cached)

    autoria_service = AutoRiaService()
    advertisement = await autoria_service.get_advertisement_by_url(url)
    await cache.set(key, advertisement.model_dump_json(), settings.AUTORIA_CACHE_TTL_SECONDS)
    return advertisement


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


def _error_detail(exc: Exception) -> str:
    detail = getattr(exc, "detail", None) or str(exc)
    return str(detail)


def _validation_status(detail: str) -> int:
    if "API_KEY" in detail.upper():
        return status.HTTP_503_SERVICE_UNAVAILABLE
    return status.HTTP_422_UNPROCESSABLE_ENTITY


@router.post("", response_model=AnalysisApiResponse)
async def analyze_autoria_listing(payload: AnalysisRequest, request: Request) -> AnalysisApiResponse:
    client_key = _client_key(request)
    if not _analysis_rate_limiter.is_allowed(client_key):
        retry_after = _analysis_rate_limiter.retry_after_seconds(client_key)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Забагато запитів на аналіз. Спробуйте ще раз приблизно через {max(1, retry_after // 60)} хв.",
        )

    try:
        advertisement = await _get_advertisement(str(payload.url))
    except ValidationError as exc:
        # Invalid AUTO.RIA URL or missing AUTO_RIA_API_KEY
        detail = _error_detail(exc)
        raise HTTPException(status_code=_validation_status(detail), detail=detail) from exc
    except ExternalAPIError as exc:
        # AUTO.RIA API failure
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=_error_detail(exc),
        ) from exc

    try:
        ai_service = AIReportGenerator()
        report = await ai_service.generate(advertisement)
    except ValidationError as exc:
        # OPENAI_API_KEY is not configured or similar validation issue
        detail = _error_detail(exc)
        raise HTTPException(status_code=_validation_status(detail), detail=detail) from exc
    except ExternalAPIError as exc:
        # Upstream AI provider failure
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=_error_detail(exc),
        ) from exc

    response = _to_api_response(advertisement, report)
    await analysis_store.save(response)
    return response


@router.get("/{analysis_id}", response_model=AnalysisApiResponse)
async def get_analysis(analysis_id: str) -> AnalysisApiResponse:
    analysis = await analysis_store.get(analysis_id)
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found",
        )
    return analysis
