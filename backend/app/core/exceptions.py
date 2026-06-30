from fastapi import HTTPException, status


class VehicleNotFoundError(HTTPException):
    def __init__(self, vin: str):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND,
                         detail=f"Vehicle with VIN '{vin}' not found.")


class ReportNotFoundError(HTTPException):
    def __init__(self, report_id: str):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND,
                         detail=f"Report '{report_id}' not found.")


class ReportGenerationError(HTTPException):
    def __init__(self, detail: str = "Failed to generate report."):
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)


class ExternalAPIError(HTTPException):
    def __init__(self, service: str, detail: str = ""):
        super().__init__(status_code=status.HTTP_502_BAD_GATEWAY,
                         detail=f"External service '{service}' error. {detail}")


class StorageError(HTTPException):
    def __init__(self, detail: str = "Storage operation failed."):
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)
