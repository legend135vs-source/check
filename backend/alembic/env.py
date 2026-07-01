import sys
import traceback
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool, text
from alembic import context

try:
    from app.core.config import settings
    from app.models.base import Base
    import app.models  # noqa: F401
except Exception as e:
    print(f"[ALEMBIC IMPORT ERROR] {e}", flush=True)
    traceback.print_exc()
    sys.exit(1)

MIGRATION_LOCK_ID = 987654321


def _make_sync_url(url: str) -> str:
    url = url.replace("postgresql+asyncpg://", "postgresql://")
    url = url.replace("postgres+asyncpg://", "postgresql://")
    if url.startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://"):]
    return url


config = context.config

try:
    config.set_main_option("sqlalchemy.url", _make_sync_url(settings.DATABASE_URL))
except Exception as e:
    print(f"[ALEMBIC CONFIG ERROR] {e}", flush=True)
    traceback.print_exc()
    sys.exit(1)

if config.config_file_name is not None:
    try:
        fileConfig(config.config_file_name)
    except Exception:
        pass

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
    try:
        with connectable.connect() as connection:
            connection.execute(text(f"SELECT pg_advisory_lock({MIGRATION_LOCK_ID})"))
            try:
                context.configure(
                    connection=connection,
                    target_metadata=target_metadata,
                )
                with context.begin_transaction():
                    context.run_migrations()
            finally:
                connection.execute(text(f"SELECT pg_advisory_unlock({MIGRATION_LOCK_ID})"))
    except Exception as e:
        print(f"[ALEMBIC MIGRATION ERROR] {e}", flush=True)
        traceback.print_exc()
        sys.exit(1)


try:
    if context.is_offline_mode():
        run_migrations_offline()
    else:
        run_migrations_online()
except Exception as e:
    print(f"[ALEMBIC RUN ERROR] {e}", flush=True)
    traceback.print_exc()
    sys.exit(1)
