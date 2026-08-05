import json

from openai import OpenAI

from app.core.config import settings
from app.core.exceptions import ExternalAPIError, ValidationError
from app.schemas.analysis import AdvertisementData, AnalysisReport


class AIReportGenerator:
    def __init__(self) -> None:
        api_key = getattr(settings, "OPENAI_API_KEY", None)
        if not api_key:
            raise ValidationError("OPENAI_API_KEY is not configured")
        self.client = OpenAI(api_key=api_key)
        self.model = getattr(settings, "OPENAI_MODEL", "gpt-4o-mini")

    async def generate(self, advertisement: AdvertisementData) -> AnalysisReport:
        prompt = self._build_prompt(advertisement)

        try:
            completion = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "Ти автомобільний AI-експерт. Відповідай лише валідним JSON."},
                    {"role": "user", "content": prompt},
                ],
                response_format={"type": "json_object"},
                temperature=0.2,
            )
            content = completion.choices[0].message.content or "{}"
            payload = json.loads(content)
            return AnalysisReport(**payload)
        except Exception as exc:
            raise ExternalAPIError(service="OpenAI", detail=f"AI report generation failed: {exc}") from exc

    def _build_prompt(self, ad: AdvertisementData) -> str:
        return f"""
Проаналізуй оголошення AUTO.RIA і поверни JSON із ключами:
overall_assessment, pros, cons, risks, common_issues, photo_analysis,
description_analysis, expected_costs, questions_to_seller,
service_checklist, final_conclusion.

Вимоги:
- українською;
- без категоричних висновків про фото;
- використовуй обережні формулювання: можливо, ймовірно, рекомендується перевірити;
- якщо даних мало, прямо зазнач це.

Дані оголошення:
{json.dumps(ad.model_dump(), ensure_ascii=False, indent=2)}
""".strip()
