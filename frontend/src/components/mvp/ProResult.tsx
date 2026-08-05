import type { ProResult as ProResultType } from '@/types/analysis.types';

interface ProResultProps {
  result: ProResultType;
}

function ListBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2 rounded-2xl border bg-slate-50 p-4">
      <h3 className="font-medium text-slate-900">{title}</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function TextBlock({ title, text }: { title: string; text?: string | null }) {
  if (!text) return null;

  return (
    <section className="space-y-2 rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="font-medium text-slate-900">{title}</h3>
      <p className="whitespace-pre-line text-sm leading-6 text-slate-700">{text}</p>
    </section>
  );
}

export function ProResult({ result }: ProResultProps) {
  return (
    <section className="space-y-5 rounded-3xl border bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">PRO-результат</h2>
        <p className="text-sm text-slate-600">Повний звіт по оголошенню.</p>
      </div>

      <div className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
        <p><span className="font-medium text-slate-900">Оголошення:</span> {result.title || '—'}</p>
        <p><span className="font-medium text-slate-900">Авто:</span> {[result.brand, result.model, result.year].filter(Boolean).join(' ') || '—'}</p>
        <p><span className="font-medium text-slate-900">Місто:</span> {result.city || '—'}</p>
        <p><span className="font-medium text-slate-900">VIN:</span> {result.vin || '—'}</p>
        <p><span className="font-medium text-slate-900">Пробіг:</span> {result.mileage ? `${result.mileage} км` : '—'}</p>
        <p><span className="font-medium text-slate-900">Ціна:</span> {result.price_usd ? `$${result.price_usd}` : '—'}</p>
      </div>

      <TextBlock title="Короткий висновок" text={result.final_conclusion || result.recommendation} />
      <TextBlock title="Детальний аналіз" text={result.detailed_analysis} />
      <TextBlock title="Загальний огляд" text={result.recommendation} />

      <div className="grid gap-4 md:grid-cols-2">
        <ListBlock title="Плюси" items={result.pros} />
        <ListBlock title="Мінуси" items={result.cons} />
        <ListBlock title="Ризики" items={result.risks} />
        <ListBlock title="Поширені проблеми" items={result.common_issues} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ListBlock title="Аналіз фото" items={result.photo_analysis} />
        <ListBlock title="Аналіз опису" items={result.description_analysis} />
        <ListBlock title="Очікувані витрати" items={result.expected_costs} />
        <ListBlock title="Питання до продавця" items={result.questions_to_seller} />
      </div>

      <ListBlock title="Чекліст перевірки" items={result.service_checklist} />

      {result.description ? (
        <section className="space-y-2 rounded-2xl border bg-slate-50 p-4">
          <h3 className="font-medium text-slate-900">Опис оголошення</h3>
          <p className="whitespace-pre-line text-sm leading-6 text-slate-700">{result.description}</p>
        </section>
      ) : null}

      {result.photos?.length ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {result.photos.slice(0, 6).map((photo) => (
            <img key={photo} src={photo} alt="AUTO.RIA photo" className="h-36 w-full rounded-2xl object-cover" />
          ))}
        </div>
      ) : null}
    </section>
  );
}
