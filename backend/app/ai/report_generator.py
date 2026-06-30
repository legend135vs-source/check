from openai import AsyncOpenAI
from app.core.config import settings
from app.domain.entities.report import ReportEntity
from app.ai.prompt_builder import PromptBuilder


class ReportGenerator:
    def __init__(self, prompt_builder: PromptBuilder):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.prompt_builder = prompt_builder

    async def generate(self, report: ReportEntity) -> tuple[str, float]:
        """Returns (ai_summary, risk_score)"""
        context = self._build_context(report)
        prompt = await self.prompt_builder.build("full_report", context)
        response = await self.client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            max_tokens=settings.OPENAI_MAX_TOKENS,
            messages=[
                {"role": "system", "content": await self.prompt_builder.build("base_prompt", {})},
                {"role": "user", "content": prompt},
            ],
        )
        summary = response.choices[0].message.content or ""
        risk_score = self._extract_risk_score(summary)
        return summary, risk_score

    def _build_context(self, report: ReportEntity) -> dict:
        vd = report.vin_data
        return {
            "vin": report.vin or "",
            "make": vd.make if vd else "Unknown",
            "model": vd.model if vd else "Unknown",
            "year": vd.year if vd else "Unknown",
            "auction_count": len(report.auction_records),
            "damage_count": sum(1 for p in report.photo_analyses if p.damage_detected),
            "auction_summary": ", ".join(
                r.primary_damage for r in report.auction_records if r.primary_damage
            ) or "No auction history",
        }

    def _extract_risk_score(self, text: str) -> float:
        import re
        match = re.search(r"risk[_\s]?score[:\s]+([0-9.]+)", text, re.IGNORECASE)
        if match:
            try:
                score = float(match.group(1))
                return min(max(score, 0.0), 10.0)
            except ValueError:
                pass
        return 5.0
