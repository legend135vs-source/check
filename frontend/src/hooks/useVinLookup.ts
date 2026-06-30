'use client'

import { useState } from 'react'
import { decodeVin } from '@/lib/api/vin.api'

export function useVinLookup() {
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function lookup(vin: string) {
    setLoading(true)
    setError(null)
    try {
      const result = await decodeVin(vin)
      setData(result)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'VIN lookup failed')
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, lookup }
}
