"""Seed the database with initial data (brands + default AI prompts)."""
import asyncio
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionFactory, engine
from app.models.base import Base
from app.models.brand import Brand
from app.models.ai_prompt import AIPrompt


BRANDS = [
    {"name": "Toyota", "country": "Japan"},
    {"name": "Honda", "country": "Japan"},
    {"name": "Ford", "country": "USA"},
    {"name": "BMW", "country": "Germany"},
    {"name": "Mercedes-Benz", "country": "Germany"},
    {"name": "Volkswagen", "country": "Germany"},
    {"name": "Chevrolet", "country": "USA"},
    {"name": "Hyundai", "country": "South Korea"},
    {"name": "Kia", "country": "South Korea"},
    {"name": "Nissan", "country": "Japan"},
]

PROMPTS = [
    {
        "key": "base_prompt",
        "description": "System base prompt for all AI requests",
        "template": (
            "You are an expert automotive inspector AI. "
            "Analyze vehicle data accurately and professionally. "
            "Always be helpful to potential buyers."
        ),
    },
    {
        "key": "full_report",
        "description": "Full report generation prompt",
        "template": (
            "Analyze this vehicle: {year} {make} {model} (VIN: {vin}).\n"
            "Auction records: {auction_count}. Damage incidents: {damage_count}.\n"
            "Auction damage: {auction_summary}.\n\n"
            "Provide: 1) Overall assessment 2) risk_score: X/10 3) Key concerns "
            "4) Recommended inspections 5) Buying recommendation."
        ),
    },
]


async def seed():
    async with AsyncSessionFactory() as db:
        for brand_data in BRANDS:
            brand = Brand(**brand_data)
            db.add(brand)
        for prompt_data in PROMPTS:
            prompt = AIPrompt(**prompt_data)
            db.add(prompt)
        await db.commit()
        print(f"Seeded {len(BRANDS)} brands and {len(PROMPTS)} prompts.")


if __name__ == "__main__":
    asyncio.run(seed())
