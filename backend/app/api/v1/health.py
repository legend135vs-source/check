from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("")
@router.get("/")
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}
