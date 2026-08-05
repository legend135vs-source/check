from typing import Literal

from pydantic import AnyHttpUrl, BaseModel


class AnalysisRequest(BaseModel):
    url: AnyHttpUrl


class AdvertisementData(BaseModel):
    auto_id: int
    title: str | None = None
    mark_name: str | None = None
    model_name: str | None = None
    year: int | None = None
    price_usd: int | None = None
    mileage_km: int | None = None
    city: str | None = None
    vin: str | None = None
    description: str | None = None
    photos: list[str] = []
    raw: dict = {}


class AnalysisReport(BaseModel):
    overall_assessment: str | None = None
    pros: list[str] = []
    cons: list[str] = []
    risks: list[str] = []
    common_issues: list[str] = []
    photo_analysis: list[str] = []
    description_analysis: list[str] = []
    expected_costs: list[str] = []
    questions_to_seller: list[str] = []
    service_checklist: list[str] = []
    final_conclusion: str | None = None


class AnalysisResponse(BaseModel):
    auto_id: int
    advertisement: AdvertisementData
    report: AnalysisReport


class AnalysisApiResponse(BaseModel):
    stage: Literal['free', 'paywall', 'pro']
    analysis_id: str
    brand: str | None = None
    model: str | None = None
    year: int | None = None
    mileage: int | None = None
    price_usd: int | None = None
    summary: str | None = None
    risk_preview: str | None = None
    paywall_reason: str | None = None
    price_uah: int | None = None
    payment_url: str | None = None
    recommendation: str | None = None
    pros: list[str] = []
    cons: list[str] = []
    risks: list[str] = []
    detailed_analysis: str | None = None
