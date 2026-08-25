"""Simple in-memory sliding-window rate limiter.

Good enough for a single-instance MVP deployment. If the service scales to
multiple instances, this should be replaced with a Redis-backed limiter.
"""

import time
from collections import defaultdict, deque


class SlidingWindowRateLimiter:
    def __init__(self, limit: int, window_seconds: int) -> None:
        self.limit = limit
        self.window_seconds = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)

    def is_allowed(self, key: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds

        hits = self._hits[key]
        while hits and hits[0] < window_start:
            hits.popleft()

        if len(hits) >= self.limit:
            return False

        hits.append(now)
        return True

    def retry_after_seconds(self, key: str) -> int:
        hits = self._hits.get(key)
        if not hits:
            return 0
        return max(0, int(self.window_seconds - (time.time() - hits[0])))
