import type { Report } from '@/types/report.types'
import { RiskScoreBadge } from './RiskScoreBadge'
import { AuctionHistory } from './AuctionHistory'
import { DamageGallery } from './DamageGallery'
import { BuyingChecklist } from './BuyingChecklist'
import { DownloadPdfButton } from '@/components/shared/DownloadPdfButton'
import { Car } from 'lucide-react'
import { formatDate } from '@/lib/utils/formatters'

interface Props { report: Report }

export function ReportViewer({ report }: Props) {
  const v = report.vehicle

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Car className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">
              {v ? `${v.year} ${v.make} ${v.model}` : report.vin ?? 'Vehicle Report'}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            VIN: {report.vin} · Звіт від {formatDate(report.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {report.risk_score != null && <RiskScoreBadge score={report.risk_score} />}
          {report.pdf_url && <DownloadPdfButton pdfUrl={report.pdf_url} reportId={report.id} />}
        </div>
      </div>

      {/* AI Summary */}
      {report.ai_summary && (
        <section className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">AI Висновок</h2>
          <p className="text-sm text-foreground leading-relaxed">{report.ai_summary}</p>
        </section>
      )}

      {/* Tech Specs */}
      {v && (
        <section>
          <h2 className="font-semibold text-lg mb-3">Технічні характеристики</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              ['Марка', v.make], ['Модель', v.model], ['Рік', v.year],
              ['Двигун', v.engine], ['Трансмісія', v.transmission],
              ['Паливо', v.fuel_type], ['Кузов', v.body_type],
            ].filter(([, val]) => val).map(([label, val]) => (
              <div key={label as string} className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                <p className="text-sm font-medium">{val}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Auction History */}
      {report.auction_records.length > 0 && (
        <AuctionHistory records={report.auction_records} />
      )}

      {/* Damage Gallery */}
      {report.photo_analyses.length > 0 && (
        <DamageGallery analyses={report.photo_analyses} />
      )}

      {/* Buying Checklist */}
      <BuyingChecklist riskScore={report.risk_score ?? 5} />
    </main>
  )
}
