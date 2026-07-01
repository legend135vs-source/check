FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    libpango-1.0-0 \
    libpangoft2-1.0-0 \
    libpangocairo-1.0-0 \
    libcairo2 \
    libgdk-pixbuf-xlib-2.0-0 \
    libffi-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# cache-bust: 2026-07-01-v5
ARG CACHEBUST=1

EXPOSE 8000

CMD ["sh", "-c", "echo '=== RUNNING ALEMBIC ===' && alembic -c alembic.ini upgrade head; EXIT=$?; echo \"=== ALEMBIC EXIT CODE: $EXIT ==="; if [ $EXIT -ne 0 ]; then echo '=== ALEMBIC FAILED - check errors above ===' && exit 1; fi && echo '=== STARTING UVICORN ===' && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
