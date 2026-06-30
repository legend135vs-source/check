import pytest
from unittest.mock import AsyncMock
from app.services.vin_service import VINService
from app.domain.entities.vin_data import VINData


@pytest.mark.asyncio
async def test_vin_service_uses_cache():
    mock_decoder = AsyncMock()
    mock_cache = AsyncMock()
    mock_cache.get.return_value = {
        "vin": "1HGCM82633A004352", "make": "Honda", "model": "Accord",
        "year": 2003, "body_type": None, "engine": None, "fuel_type": None,
        "transmission": None, "drive_type": None, "country_of_manufacture": None,
        "extra": {},
    }
    service = VINService(decoder=mock_decoder, cache=mock_cache)
    result = await service.decode("1HGCM82633A004352")
    assert result.make == "Honda"
    mock_decoder.decode.assert_not_called()
