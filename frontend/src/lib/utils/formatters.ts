export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export function formatOdometer(km: number): string {
  return `${km.toLocaleString('uk-UA')} км`
}

export function formatPrice(usd: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(usd)
}

export function riskLabel(score: number): { label: string; color: string } {
  if (score <= 3) return { label: 'Низький ризик', color: 'text-green-600' }
  if (score <= 6) return { label: 'Середній ризик', color: 'text-yellow-600' }
  return { label: 'Високий ризик', color: 'text-red-600' }
}
