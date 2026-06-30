import base64
import httpx
from openai import AsyncOpenAI
from app.core.config import settings
from app.domain.entities.photo_analysis import PhotoAnalysisEntity


class VisionAnalyzer:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    async def analyze(self, photo_urls: list[str]) -> list[PhotoAnalysisEntity]:
        results = []
        for url in photo_urls:
            result = await self._analyze_single(url)
            results.append(result)
        return results

    async def _analyze_single(self, photo_url: str) -> PhotoAnalysisEntity:
        response = await self.client.chat.completions.create(
            model=settings.OPENAI_VISION_MODEL,
            max_tokens=500,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": (
                                "Analyze this vehicle photo for damage. "
                                "Return JSON: {damage_detected: bool, damage_description: str, "
                                "confidence_score: float 0-1, damage_zones: {zone: severity}}"
                            ),
                        },
                        {"type": "image_url", "image_url": {"url": photo_url}},
                    ],
                }
            ],
        )
        import json, re
        text = response.choices[0].message.content or "{}"
        match = re.search(r"\{.*\}", text, re.DOTALL)
        data = json.loads(match.group()) if match else {}
        return PhotoAnalysisEntity(
            photo_url=photo_url,
            damage_detected=data.get("damage_detected", False),
            damage_description=data.get("damage_description"),
            confidence_score=data.get("confidence_score"),
            damage_zones=data.get("damage_zones", {}),
        )
