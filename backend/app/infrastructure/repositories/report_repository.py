import uuid
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.interfaces.i_report_repository import IReportRepository
from app.models.report import Report


class ReportRepository(IReportRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, **kwargs) -> Report:
        report = Report(**kwargs)
        self.db.add(report)
        await self.db.flush()
        await self.db.refresh(report)
        return report

    async def get_by_id(self, report_id: uuid.UUID) -> Optional[Report]:
        result = await self.db.execute(select(Report).where(Report.id == report_id))
        return result.scalar_one_or_none()

    async def update(self, report_id: uuid.UUID, **kwargs) -> Optional[Report]:
        report = await self.get_by_id(report_id)
        if not report:
            return None
        for key, value in kwargs.items():
            setattr(report, key, value)
        await self.db.flush()
        await self.db.refresh(report)
        return report
