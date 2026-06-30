# Import all models so SQLAlchemy registers them before Alembic scans metadata.
# Order matters: base tables first, then tables with FK references.
from app.models import brand       # noqa: F401
from app.models import model       # noqa: F401
from app.models import engine      # noqa: F401
from app.models import vehicle     # noqa: F401
from app.models import report      # noqa: F401
from app.models import auction_record  # noqa: F401
from app.models import photo_analysis  # noqa: F401
from app.models import ai_prompt   # noqa: F401
from app.models import pricing     # noqa: F401
from app.models import maintenance # noqa: F401
from app.models import problem     # noqa: F401
from app.models import recall      # noqa: F401
from app.models import request_log # noqa: F401
