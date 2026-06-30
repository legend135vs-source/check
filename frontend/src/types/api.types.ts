export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ApiResponse<T> {
  data?: T
  error?: string
}
