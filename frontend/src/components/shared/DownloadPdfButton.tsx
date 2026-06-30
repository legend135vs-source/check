'use client'

import { FileDown } from 'lucide-react'

interface Props {
  pdfUrl: string
  reportId: string
}

export function DownloadPdfButton({ pdfUrl, reportId }: Props) {
  return (
    <a
      href={pdfUrl}
      download={`report-${reportId}.pdf`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      <FileDown className="w-4 h-4" />
      Завантажити PDF
    </a>
  )
}
