import { cn } from '@/lib/utils/cn'
import { riskLabel } from '@/lib/utils/formatters'

interface Props { score: number }

export function RiskScoreBadge({ score }: Props) {
  const { label, color } = riskLabel(score)
  const bg = score <= 3 ? 'bg-green-50 border-green-200' :
             score <= 6 ? 'bg-yellow-50 border-yellow-200' :
                          'bg-red-50 border-red-200'
  return (
    <div className={cn('border rounded-xl px-4 py-2 text-center', bg)}>
      <p className={cn('text-2xl font-bold', color)}>{score}<span className="text-sm font-normal">/10</span></p>
      <p className={cn('text-xs font-medium', color)}>{label}</p>
    </div>
  )
}
