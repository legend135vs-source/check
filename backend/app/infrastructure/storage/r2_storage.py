import boto3
from botocore.config import Config
from app.domain.interfaces.i_storage import IStorage
from app.core.config import settings
from app.core.exceptions import StorageError


class R2Storage(IStorage):
    def __init__(self):
        self._client = boto3.client(
            "s3",
            endpoint_url=f"https://{settings.R2_ACCOUNT_ID}.r2.cloudflarestorage.com",
            aws_access_key_id=settings.R2_ACCESS_KEY_ID,
            aws_secret_access_key=settings.R2_SECRET_ACCESS_KEY,
            config=Config(signature_version="s3v4"),
        )

    async def upload(self, key: str, data: bytes, content_type: str = "application/octet-stream") -> str:
        try:
            self._client.put_object(
                Bucket=settings.R2_BUCKET_NAME,
                Key=key,
                Body=data,
                ContentType=content_type,
            )
            return f"{settings.R2_PUBLIC_URL}/{key}"
        except Exception as e:
            raise StorageError(detail=str(e))

    async def delete(self, key: str) -> None:
        try:
            self._client.delete_object(Bucket=settings.R2_BUCKET_NAME, Key=key)
        except Exception as e:
            raise StorageError(detail=str(e))
