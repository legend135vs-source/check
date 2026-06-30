'use client'

import { useState } from 'react'
import { analyzePhotos } from '@/lib/api/photo.api'
import type { PhotoAnalysis } from '@/types/report.types'

export function usePhotoUpload() {
  const [results, setResults] = useState<PhotoAnalysis[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function upload(files: File[]) {
    setLoading(true)
    setError(null)
    try {
      const data = await analyzePhotos(files)
      setResults(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, upload }
}
