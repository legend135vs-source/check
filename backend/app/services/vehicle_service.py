from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.vehicle import Vehicle


class VehicleService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def search(self, query: str) -> list[Vehicle]:
        result = await self.db.execute(
            select(Vehicle).where(Vehicle.vin.ilike(f"%{query}%")).limit(20)
        )
        return list(result.scalars().all())
