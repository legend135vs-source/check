import apiClient from './client'
import type { PhotoAnalysis } from '@/types/report.types'

export async function analyzePhotos(files: File[]): Promise<PhotoAnalysis[]> {
  const form = new FormData()
  files.forEach((f) => form.append('files', f))
  const res = await apiClient.post<PhotoAnalysis[]>('/photo/analyze', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}
