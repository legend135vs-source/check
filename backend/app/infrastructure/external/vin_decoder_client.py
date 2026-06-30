import httpx
from app.domain.entities.vin_data import VINData
from app.domain.interfaces.i_vin_decoder import IVINDecoder
from app.core.config import settings
from app.core.exceptions import ExternalAPIError


class NHTSAVINDecoder(IVINDecoder):
    BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin"

    async def decode(self, vin: str) -> VINData:
        url = f"{self.BASE_URL}/{vin}?format=json"
        try:
            async with httpx.AsyncClient(timeout=10) as client:
                response = await client.get(url)
                response.raise_for_status()
                data = response.json()
        except httpx.HTTPError as e:
            raise ExternalAPIError(service="NHTSA VIN Decoder", detail=str(e))

        results = {r["Variable"]: r["Value"] for r in data.get("Results", [])}
        return VINData(
            vin=vin,
            make=results.get("Make"),
            model=results.get("Model"),
            year=int(results["Model Year"]) if results.get("Model Year") else None,
            body_type=results.get("Body Class"),
            engine=results.get("Displacement (L)"),
            fuel_type=results.get("Fuel Type - Primary"),
            transmission=results.get("Transmission Style"),
            drive_type=results.get("Drive Type"),
            country_of_manufacture=results.get("Manufacturer Name"),
            extra=results,
        )
