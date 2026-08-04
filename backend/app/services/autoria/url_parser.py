import re
from urllib.parse import urlparse

from app.core.exceptions import ValidationError

_ALLOWED_HOSTS = {"auto.ria.com", "www.auto.ria.com", "auto.ria.com.ua", "www.auto.ria.com.ua"}
_AUTO_ID_RE = re.compile(r"(\d{5,})")


def extract_auto_id(url: str) -> int:
    parsed = urlparse(url)

    if parsed.scheme not in {"http", "https"}:
        raise ValidationError("Посилання має починатися з http або https")

    host = parsed.netloc.lower()
    if host not in _ALLOWED_HOSTS:
        raise ValidationError("Підтримуються лише посилання AUTO.RIA")

    match = _AUTO_ID_RE.search(parsed.path)
    if not match:
        raise ValidationError("Не вдалося знайти ID оголошення в посиланні")

    return int(match.group(1))
