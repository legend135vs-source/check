from logging.config import fileConfig
import configparser

from sqlalchemy import engine_from_config, pool
from alembic import context

from app.core.config import settings
from app.models.base import Base
import app.models  # noqa: F401 - registers all ORM models


def _make_sync_url(url: str) -> str:
    """Ensure we use psycopg2 (sync) driver for Alembic migrations."""
    # Strip async drivers
    url = url.replace("postgresql+asyncpg://", "postgresql://")
    url = url.replace("postgres+asyncpg://", "postgresql://")
    # Normalize Railway's postgres:// shorthand
    if url.startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://"):]
    return url


config = context.config
config.set_main_option("sqlalchemy.url", _make_sync_url(settings.DATABASE_URL))

# Load logging config only if ini has the required sections
if config.config_file_name is not None:
    _cp = configparser.ConfigParser()
    _cp.read(config.config_file_name)
    if _cp.has_section("formatters"):
        fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    context.configure(
        url=_make_sync_url(settings.DATABASE_URL),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
