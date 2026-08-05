import type { PaywallResult } from '@/types/analysis.types';

interface PaywallProps {
  result: PaywallResult;
}

export function Paywall({ result }: PaywallProps) {
  return (
    <section className="space-y-4 rounded-2xl border p-6">
      <h2 className="text-xl font-semibold">Потрібна оплата</h2>
      <p className="text-sm">
        {[result.brand, result.model, result.year].filter(Boolean).join(' ') || 'Аналіз майже готовий'}
      </p>
      {result.paywall_reason ? <p className="text-sm">{result.paywall_reason}</p> : null}
      {typeof result.price_uah === 'number' ? (
        <p className="text-sm font-medium">Вартість: {result.price_uah} грн</p>
      ) : null}
      {result.payment_url ? (
        <a
          href={result.payment_url}
          className="inline-flex rounded-xl bg-black px-4 py-3 text-white"
        >
          Перейти до оплати
        </a>
      ) : null}
    </section>
  );
}
