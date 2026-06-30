from abc import ABC, abstractmethod


class IStorage(ABC):
    @abstractmethod
    async def upload(self, key: str, data: bytes, content_type: str = "application/octet-stream") -> str:
        """Returns public URL"""
        ...

    @abstractmethod
    async def delete(self, key: str) -> None:
        ...
