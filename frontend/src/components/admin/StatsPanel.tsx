'use client'

import { useEffect, useState } from 'react'
import { getStats } from '@/lib/api/admin.api'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

export function StatsPanel() {
  const [stats, setStats] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStats().then(setStats).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>
  if (!stats) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(stats).map(([key, val]) => (
        <div key={key} className="border rounded-xl p-4">
          <p className="text-xs text-muted-foreground capitalize mb-1">{key.replace(/_/g, ' ')}</p>
          <p className="text-2xl font-bold">{String(val)}</p>
        </div>
      ))}
    </div>
  )
}
