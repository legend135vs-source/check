import apiClient from './client'
import type { Report } from '@/types/report.types'

export async function createReport(data: {
  vin?: string
  auto_ria_url?: string
}): Promise<Report> {
  const res = await apiClient.post<Report>('/report', data)
  return res.data
}

export async function getReport(id: string): Promise<Report> {
  const res = await apiClient.get<Report>(`/report/${id}`)
  return res.data
}
