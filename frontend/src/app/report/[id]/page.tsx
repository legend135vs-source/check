'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useReportGeneration } from '@/hooks/useReportGeneration'
import { ReportViewer } from '@/components/report/ReportViewer'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { ErrorBanner } from '@/components/shared/ErrorBanner'

export default function ReportPage() {
  const { id } = useParams<{ id: string }>()
  const { report, status, error, poll } = useReportGeneration()

  useEffect(() => {
    if (id) poll(id)
  }, [id])

  if (error) return <ErrorBanner message={error} />

  if (!report || status === 'pending' || status === 'processing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <LoadingSpinner />
        <p className="text-muted-foreground text-sm">
          {status === 'pending' ? 'Queued…' : 'Analyzing vehicle with AI…'}
        </p>
      </div>
    )
  }

  return <ReportViewer report={report} />
}
