from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_db
from app.schemas.admin import BrandCreate, BrandResponse, PromptCreate, PromptResponse, StatsResponse
from app.services.admin_service import AdminService
from app.models.brand import Brand
from app.models.ai_prompt import AIPrompt

router = APIRouter()


@router.get("/stats", response_model=StatsResponse)
async def get_stats(db: AsyncSession = Depends(get_db)):
    service = AdminService(db)
    return await service.get_stats()


@router.post("/brands", response_model=BrandResponse)
async def create_brand(body: BrandCreate, db: AsyncSession = Depends(get_db)):
    brand = Brand(**body.model_dump())
    db.add(brand)
    await db.flush()
    await db.refresh(brand)
    return BrandResponse.model_validate(brand)


@router.get("/brands", response_model=list[BrandResponse])
async def list_brands(db: AsyncSession = Depends(get_db)):
    from sqlalchemy import select
    result = await db.execute(select(Brand).order_by(Brand.name))
    return [BrandResponse.model_validate(b) for b in result.scalars().all()]


@router.post("/prompts", response_model=PromptResponse)
async def create_prompt(body: PromptCreate, db: AsyncSession = Depends(get_db)):
    prompt = AIPrompt(**body.model_dump())
    db.add(prompt)
    await db.flush()
    await db.refresh(prompt)
    return PromptResponse.model_validate(prompt)


@router.get("/prompts", response_model=list[PromptResponse])
async def list_prompts(db: AsyncSession = Depends(get_db)):
    from sqlalchemy import select
    result = await db.execute(select(AIPrompt).order_by(AIPrompt.key))
    return [PromptResponse.model_validate(p) for p in result.scalars().all()]
