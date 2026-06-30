from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.report import Report, ReportStatus
from app.models.brand import Brand
from app.models.ai_prompt import AIPrompt


class AdminService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_stats(self) -> dict:
        total = await self.db.scalar(select(func.count(Report.id)))
        done = await self.db.scalar(
            select(func.count(Report.id)).where(Report.status == ReportStatus.DONE)
        )
        failed = await self.db.scalar(
            select(func.count(Report.id)).where(Report.status == ReportStatus.FAILED)
        )
        avg_risk = await self.db.scalar(select(func.avg(Report.risk_score)))
        return {
            "total_reports": total or 0,
            "reports_today": 0,
            "reports_done": done or 0,
            "reports_failed": failed or 0,
            "avg_risk_score": round(float(avg_risk), 2) if avg_risk else None,
        }
