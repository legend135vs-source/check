'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getReport } from '@/lib/api/report.api'
import type { Report, ReportStatus } from '@/types/report.types'
import { POLL_INTERVAL_MS, POLL_MAX_ATTEMPTS } from '@/lib/utils/constants'

export function useReportGeneration() {
  const [report, setReport] = useState<Report | null>(null)
  const [status, setStatus] = useState<ReportStatus>('pending')
  const [error, setError] = useState<string | null>(null)
  const attempts = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function poll(id: string) {
    attempts.current = 0
    tick(id)
  }

  function tick(id: string) {
    if (attempts.current >= POLL_MAX_ATTEMPTS) {
      setError('Час очікування вичерпано. Спробуйте ще раз.')
      return
    }
    getReport(id)
      .then((data) => {
        setReport(data)
        setStatus(data.status)
        if (data.status === 'pending' || data.status === 'processing') {
          attempts.current++
          timer.current = setTimeout(() => tick(id), POLL_INTERVAL_MS)
        }
        if (data.status === 'failed') {
          setError('Не вдалося згенерувати звіт. Перевірте VIN або посилання.')
        }
      })
      .catch((err) => setError(err.message))
  }

  return { report, status, error, poll }
}
