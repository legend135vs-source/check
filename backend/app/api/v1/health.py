from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
@router.get("/health/")
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}
