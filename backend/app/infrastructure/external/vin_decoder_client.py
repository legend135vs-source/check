import httpx

from app.core.exceptions import ExternalAPIError
from app.domain.entities.vin_data import VINData
from app.domain.interfaces.i_vin_decoder import IVINDecoder


class NHTSAVINDecoder(IVINDecoder):
    BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended"
    TIMEOUT = httpx.Timeout(connect=5.0, read=12.0, write=5.0, pool=5.0)

    async def decode(self, vin: str) -> VINData:
        normalized_vin = self._normalize_vin(vin)

        if len(normalized_vin) != 17:
            raise ExternalAPIError(
                service="NHTSA VIN Decoder",
                detail="VIN повинен містити рівно 17 символів.",
            )

        try:
            async with httpx.AsyncClient(
                timeout=self.TIMEOUT,
                headers={"User-Agent": "AI-Vehicle-Inspector/1.0"},
            ) as client:
                response = await client.get(
                    f"{self.BASE_URL}/{normalized_vin}",
                    params={"format": "json"},
                )
                response.raise_for_status()
                payload = response.json()
        except httpx.HTTPError as error:
            raise ExternalAPIError(
                service="NHTSA VIN Decoder",
                detail=f"Не вдалося отримати дані VIN: {error}",
            ) from error
        except ValueError as error:
            raise ExternalAPIError(
                service="NHTSA VIN Decoder",
                detail="Сервіс VIN повернув некоректну відповідь.",
            ) from error

        result = self._get_result(payload)
        error_code = self._text(result.get("ErrorCode"))
        error_text = self._text(result.get("ErrorText"))

        if error_code and error_code not in {"0", "1"}:
            raise ExternalAPIError(
                service="NHTSA VIN Decoder",
                detail=error_text or "VIN не вдалося коректно декодувати.",
            )

        return VINData(
            vin=normalized_vin,
            make=self._text(result.get("Make")),
            model=self._text(result.get("Model")),
            year=self._to_int(result.get("ModelYear")),
            body_type=self._text(result.get("BodyClass")),
            engine=self._engine_label(result),
            fuel_type=self._text(result.get("FuelTypePrimary")),
            transmission=self._text(result.get("TransmissionStyle")),
            drive_type=self._text(result.get("DriveType")),
            country_of_manufacture=self._manufacturer_label(result),
            decode_status="partial" if error_code == "1" else "success",
            extra=self._extra(result, error_code, error_text),
        )

    @staticmethod
    def _normalize_vin(vin: str) -> str:
        return vin.strip().upper().replace(" ", "").replace("-", "")

    @staticmethod
    def _get_result(payload: dict) -> dict:
        results = payload.get("Results")

        if not isinstance(results, list) or not results:
            raise ExternalAPIError(
                service="NHTSA VIN Decoder",
                detail="Для цього VIN не знайдено даних.",
            )

        result = results[0]

        if not isinstance(result, dict):
            raise ExternalAPIError(
                service="NHTSA VIN Decoder",
                detail="Сервіс VIN повернув дані у невідомому форматі.",
            )

        return result

    @staticmethod
    def _text(value: object) -> str | None:
        if value is None:
            return None

        text = str(value).strip()
        return text or None

    @staticmethod
    def _to_int(value: object) -> int | None:
        try:
            return int(str(value).strip()) if value else None
        except (TypeError, ValueError):
            return None

    def _engine_label(self, result: dict) -> str | None:
        displacement = self._text(result.get("DisplacementL"))
        cylinders = self._text(result.get("EngineCylinders"))
        engine_model = self._text(result.get("EngineModel"))

        parts: list[str] = []

        if displacement:
            parts.append(f"{displacement} л")

        if cylinders:
            parts.append(f"{cylinders} цил.")

        if engine_model:
            parts.append(engine_model)

        return ", ".join(parts) if parts else None

    def _manufacturer_label(self, result: dict) -> str | None:
        manufacturer = self._text(result.get("Manufacturer"))
        country = self._text(result.get("PlantCountry"))

        if manufacturer and country:
            return f"{manufacturer}, {country}"

        return manufacturer or country

    def _extra(
        self,
        result: dict,
        error_code: str | None,
        error_text: str | None,
    ) -> dict:
        fields = (
            "VehicleType",
            "Trim",
            "Series",
            "Doors",
            "PlantCity",
            "PlantCountry",
            "PlantCompanyName",
            "Manufacturer",
            "EngineModel",
            "EngineCylinders",
            "DisplacementL",
            "Turbo",
            "Aspiration",
            "TransmissionSpeeds",
            "SteeringLocation",
            "ErrorCode",
            "ErrorText",
        )

        extra = {
            field: self._text(result.get(field))
            for field in fields
            if self._text(result.get(field)) is not None
        }

        if error_code is not None:
            extra["ErrorCode"] = error_code

        if error_text is not None:
            extra["ErrorText"] = error_text

        return extra
