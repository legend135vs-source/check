from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost:5432/avi"
    REDIS_URL: str = "redis://localhost:6379/0"

    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o"
    OPENAI_VISION_MODEL: str = "gpt-4o"
    OPENAI_MAX_TOKENS: int = 4096

    R2_ACCOUNT_ID: str = ""
    R2_ACCESS_KEY_ID: str = ""
    R2_SECRET_ACCESS_KEY: str = ""
    R2_BUCKET_NAME: str = "ai-vehicle-inspector"
    R2_PUBLIC_URL: str = ""

    VIN_API_KEY: str = ""
    VIN_API_URL: str = "https://vpic.nhtsa.dot.gov/api"
    AUTO_RIA_API_KEY: str = ""
    AUTO_RIA_API_URL: str = "https://developers.ria.com"

    PDF_ENGINE: str = "weasyprint"
    ADMIN_SECRET_PATH: str = "admin-x7k2"


settings = Settings()
