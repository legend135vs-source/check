import type { ProResult as ProResultType } from '@/types/analysis.types';

interface ProResultProps {
  result: ProResultType;
}

function ListBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-medium">{title}</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ProResult({ result }: ProResultProps) {
  return (
    <section className="space-y-4 rounded-2xl border p-6">
      <h2 className="text-xl font-semibold">PRO-результат</h2>
      <div className="grid gap-2 text-sm">
        <p><span className="font-medium">Авто:</span> {[result.brand, result.model, result.year].filter(Boolean).join(' ') || '—'}</p>
        <p><span className="font-medium">Пробіг:</span> {result.mileage ? `${result.mileage} км` : '—'}</p>
        <p><span className="font-medium">Ціна:</span> {result.price_usd ? `$${result.price_usd}` : '—'}</p>
      </div>

      {result.recommendation ? (
        <div className="space-y-2">
          <h3 className="font-medium">Рекомендація</h3>
          <p className="text-sm">{result.recommendation}</p>
        </div>
      ) : null}

      <ListBlock title="Плюси" items={result.pros} />
      <ListBlock title="Мінуси" items={result.cons} />
      <ListBlock title="Ризики" items={result.risks} />

      {result.detailed_analysis ? (
        <div className="space-y-2">
          <h3 className="font-medium">Детальний аналіз</h3>
          <p className="whitespace-pre-line text-sm">{result.detailed_analysis}</p>
        </div>
      ) : null}
    </section>
  );
}
