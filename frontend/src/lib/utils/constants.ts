export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export const API_V1 = `${API_BASE_URL}/api/v1`

export const POLL_INTERVAL_MS = 2500
export const POLL_MAX_ATTEMPTS = 60

export const MAX_PHOTO_SIZE_MB = 10
export const MAX_PHOTOS = 20
