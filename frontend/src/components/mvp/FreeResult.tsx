import type { FreeResult as FreeResultType } from '@/types/analysis.types';

interface FreeResultProps {
  result: FreeResultType;
}

function shorten(text: string, max = 220) {
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

export function FreeResult({ result }: FreeResultProps) {
  return (
    <section className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Безкоштовний результат</h2>
        <p className="text-sm text-slate-600">Швидкий preview перед повним AI-звітом.</p>
      </div>

      <div className="grid gap-2 text-sm text-slate-700">
        <p><span className="font-medium text-slate-900">Оголошення:</span> {result.title || '—'}</p>
        <p><span className="font-medium text-slate-900">Авто:</span> {[result.brand, result.model, result.year].filter(Boolean).join(' ') || '—'}</p>
        <p><span className="font-medium text-slate-900">Місто:</span> {result.city || '—'}</p>
        <p><span className="font-medium text-slate-900">VIN:</span> {result.vin || '—'}</p>
        <p><span className="font-medium text-slate-900">Пробіг:</span> {result.mileage ? `${result.mileage} км` : '—'}</p>
        <p><span className="font-medium text-slate-900">Ціна:</span> {result.price_usd ? `$${result.price_usd}` : '—'}</p>
      </div>

      {result.summary ? <p className="text-sm leading-6 text-slate-700">{result.summary}</p> : null}
      {result.risk_preview ? <p className="text-sm leading-6 text-slate-700">{result.risk_preview}</p> : null}
      {result.description ? <p className="text-sm leading-6 text-slate-600">{shorten(result.description)}</p> : null}

      {result.photos?.length ? (
        <div className="grid grid-cols-3 gap-2">
          {result.photos.slice(0, 3).map((photo) => (
            <img key={photo} src={photo} alt="AUTO.RIA photo preview" className="h-24 w-full rounded-2xl object-cover" />
          ))}
        </div>
      ) : null}
    </section>
  );
}
