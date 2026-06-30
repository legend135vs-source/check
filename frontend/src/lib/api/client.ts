import axios from 'axios'
import { API_V1 } from '@/lib/utils/constants'

const apiClient = axios.create({
  baseURL: API_V1,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
})

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.detail ?? err.message ?? 'Network error'
    return Promise.reject(new Error(message))
  }
)

export default apiClient
