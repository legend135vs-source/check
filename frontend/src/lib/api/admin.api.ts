import apiClient from './client'

const ADMIN = '/admin-x7k2'

export async function getStats() {
  const res = await apiClient.get(`${ADMIN}/stats`)
  return res.data
}

export async function listBrands() {
  const res = await apiClient.get(`${ADMIN}/brands`)
  return res.data
}

export async function createBrand(data: { name: string; country?: string }) {
  const res = await apiClient.post(`${ADMIN}/brands`, data)
  return res.data
}

export async function listPrompts() {
  const res = await apiClient.get(`${ADMIN}/prompts`)
  return res.data
}

export async function updatePrompt(id: string, data: { template: string }) {
  const res = await apiClient.put(`${ADMIN}/prompts/${id}`, data)
  return res.data
}
