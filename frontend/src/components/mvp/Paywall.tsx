import type { PaywallResult } from '@/types/analysis.types';

interface PaywallProps {
  result: PaywallResult;
}

export function Paywall({ result }: PaywallProps) {
  return (
    <section className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Потрібна оплата</h2>
      <p className="text-sm text-slate-700">
        {[result.brand, result.model, result.year].filter(Boolean).join(' ') || 'Аналіз майже готовий'}
      </p>
      {result.paywall_reason ? <p className="text-sm leading-6 text-slate-700">{result.paywall_reason}</p> : null}
      {typeof result.price_uah === 'number' ? (
        <p className="text-sm font-medium text-slate-900">Вартість: {result.price_uah} грн</p>
      ) : null}
      {result.payment_url ? (
        <a
          href={result.payment_url}
          className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Перейти до оплати
        </a>
      ) : null}
    </section>
  );
}
