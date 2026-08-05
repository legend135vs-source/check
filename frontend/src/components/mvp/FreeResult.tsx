import type { FreeResult as FreeResultType } from '@/types/analysis.types';

interface FreeResultProps {
  result: FreeResultType;
}

export function FreeResult({ result }: FreeResultProps) {
  return (
    <section className="space-y-3 rounded-2xl border p-6">
      <h2 className="text-xl font-semibold">Безкоштовний результат</h2>
      <div className="grid gap-2 text-sm">
        <p><span className="font-medium">Авто:</span> {[result.brand, result.model, result.year].filter(Boolean).join(' ') || '—'}</p>
        <p><span className="font-medium">Пробіг:</span> {result.mileage ? `${result.mileage} км` : '—'}</p>
        <p><span className="font-medium">Ціна:</span> {result.price_usd ? `$${result.price_usd}` : '—'}</p>
      </div>
      {result.summary ? <p className="text-sm">{result.summary}</p> : null}
      {result.risk_preview ? <p className="text-sm">{result.risk_preview}</p> : null}
    </section>
  );
}
