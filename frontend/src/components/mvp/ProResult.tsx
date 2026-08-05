import type { ProResult as ProResultType } from '@/types/analysis.types';

interface ProResultProps {
  result: ProResultType;
}

function ListBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-slate-900">{title}</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ProResult({ result }: ProResultProps) {
  return (
    <section className="space-y-5 rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">PRO-результат</h2>
      <div className="grid gap-2 text-sm text-slate-700">
        <p><span className="font-medium text-slate-900">Авто:</span> {[result.brand, result.model, result.year].filter(Boolean).join(' ') || '—'}</p>
        <p><span className="font-medium text-slate-900">Пробіг:</span> {result.mileage ? `${result.mileage} км` : '—'}</p>
        <p><span className="font-medium text-slate-900">Ціна:</span> {result.price_usd ? `$${result.price_usd}` : '—'}</p>
      </div>

      {result.recommendation ? (
        <div className="space-y-2">
          <h3 className="font-medium text-slate-900">Рекомендація</h3>
          <p className="text-sm leading-6 text-slate-700">{result.recommendation}</p>
        </div>
      ) : null}

      <ListBlock title="Плюси" items={result.pros} />
      <ListBlock title="Мінуси" items={result.cons} />
      <ListBlock title="Ризики" items={result.risks} />

      {result.detailed_analysis ? (
        <div className="space-y-2">
          <h3 className="font-medium text-slate-900">Детальний аналіз</h3>
          <p className="whitespace-pre-line text-sm leading-6 text-slate-700">{result.detailed_analysis}</p>
        </div>
      ) : null}
    </section>
  );
}
