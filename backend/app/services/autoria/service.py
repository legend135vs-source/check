from typing import Any

import httpx

from app.core.config import settings
from app.core.exceptions import ExternalAPIError, ValidationError
from app.schemas.analysis import AdvertisementData
from app.services.autoria.url_parser import extract_auto_id


class AutoRiaService:
    base_url = "https://developers.ria.com/auto/info"

    async def get_advertisement_by_url(self, url: str) -> AdvertisementData:
        auto_id = extract_auto_id(url)
        return await self.get_advertisement(auto_id)

    async def get_advertisement(self, auto_id: int) -> AdvertisementData:
        api_key = getattr(settings, "AUTO_RIA_API_KEY", None)
        if not api_key:
            raise ValidationError("AUTO_RIA_API_KEY is not configured")

        params = {"api_key": api_key, "auto_id": auto_id}

        try:
            async with httpx.AsyncClient(timeout=20) as client:
                response = await client.get(self.base_url, params=params)
                response.raise_for_status()
                payload: dict[str, Any] = response.json()
        except Exception as exc:
            raise ExternalAPIError(f"AUTO.RIA API request failed: {exc}") from exc

        photos = payload.get("photoData", {}).get("all", []) or []
        if isinstance(photos, list):
            photo_urls = [p for p in photos if isinstance(p, str)]
        else:
            photo_urls = []

        city = payload.get("locationCityName") or payload.get("cityName")
        title = payload.get("title")
        mark = payload.get("markName")
        model = payload.get("modelName")

        return AdvertisementData(
            auto_id=auto_id,
            title=title,
            mark_name=mark,
            model_name=model,
            year=payload.get("year"),
            price_usd=payload.get("USD"),
            mileage_km=payload.get("raceInt") or payload.get("race"),
            city=city,
            vin=payload.get("VIN") or payload.get("vin"),
            description=payload.get("description"),
            photos=photo_urls,
            raw=payload,
        )
