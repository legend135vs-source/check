import type { AuctionRecord } from '@/types/report.types'
import { formatDate, formatOdometer, formatPrice } from '@/lib/utils/formatters'
import { Gavel } from 'lucide-react'

interface Props { records: AuctionRecord[] }

export function AuctionHistory({ records }: Props) {
  return (
    <section>
      <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
        <Gavel className="w-5 h-5 text-primary" />
        Аукціонна історія ({records.length})
      </h2>
      <div className="space-y-3">
        {records.map((r, i) => (
          <div key={i} className="border rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-medium text-sm">{r.auction_name}</span>
              <span className="text-xs text-muted-foreground">{formatDate(r.sale_date)}</span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span>Пробіг: {formatOdometer(r.odometer)}</span>
              {r.sale_price && <span>Ціна: {formatPrice(r.sale_price)}</span>}
            </div>
            {r.primary_damage && (
              <p className="text-sm text-destructive font-medium">⚠ {r.primary_damage}</p>
            )}
            {r.damage_description && (
              <p className="text-xs text-muted-foreground">{r.damage_description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
