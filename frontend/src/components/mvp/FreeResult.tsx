import type { FreeResult as FreeResultType } from '@/types/analysis.types';

interface FreeResultProps {
  result: FreeResultType;
}

export function FreeResult({ result }: FreeResultProps) {
  return (
    <section className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Безкоштовний результат</h2>
      <div className="grid gap-2 text-sm text-slate-700">
        <p><span className="font-medium text-slate-900">Авто:</span> {[result.brand, result.model, result.year].filter(Boolean).join(' ') || '—'}</p>
        <p><span className="font-medium text-slate-900">Пробіг:</span> {result.mileage ? `${result.mileage} км` : '—'}</p>
        <p><span className="font-medium text-slate-900">Ціна:</span> {result.price_usd ? `$${result.price_usd}` : '—'}</p>
      </div>
      {result.summary ? <p className="text-sm leading-6 text-slate-700">{result.summary}</p> : null}
      {result.risk_preview ? <p className="text-sm leading-6 text-slate-700">{result.risk_preview}</p> : null}
    </section>
  );
}
