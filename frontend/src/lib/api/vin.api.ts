import apiClient from './client'

export async function decodeVin(vin: string) {
  const res = await apiClient.get(`/vin/${vin}`)
  return res.data
}
