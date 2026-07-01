from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    SECRET_KEY: str = "changeme"

    DATABASE_URL: str
    REDIS_URL: str = ""

    OPENAI_API_KEY: str = ""

    R2_ACCOUNT_ID: str = ""
    R2_ACCESS_KEY: str = ""
    R2_SECRET_KEY: str = ""
    R2_BUCKET: str = ""

    VIN_API_KEY: str = ""
    AUTO_RIA_API_KEY: str = ""

    ADMIN_SECRET_PATH: str = "admin-x7k2"
    PDF_ENGINE: str = "weasyprint"

    ALLOWED_ORIGINS: List[str] = ["*"]


settings = Settings()
