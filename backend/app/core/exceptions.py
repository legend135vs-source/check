from fastapi import HTTPException, status


class NotFoundError(HTTPException):
    def __init__(self, detail: str = "Not found"):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)


class ValidationError(HTTPException):
    def __init__(self, detail: str = "Validation error"):
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=detail)


class ServiceError(HTTPException):
    def __init__(self, detail: str = "Service error"):
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)


class StorageError(Exception):
    """Помилка роботи зі сховищем файлів."""


class ReportNotFoundError(Exception):
    """Звіт не знайдено."""


class ExternalAPIError(Exception):
    """Помилка під час звернення до зовнішнього API."""

    def __init__(self, *args, service: str | None = None, detail: str | None = None):
        self.service = service
        self.detail = detail
        message = detail or (args[0] if args else "External API error")
        super().__init__(message)
