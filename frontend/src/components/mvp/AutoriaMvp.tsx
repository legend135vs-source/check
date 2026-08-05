'use client';

import { useState } from 'react';
import { createAnalysis } from '@/lib/api/analysis.api';
import type { AnalysisResponse } from '@/types/analysis.types';
import { AnalysisForm } from './AnalysisForm';
import { FreeResult } from './FreeResult';
import { Paywall } from './Paywall';
import { ProResult } from './ProResult';

const steps = [
  'Вставляєш посилання на оголошення AUTO.RIA',
  'Отримуєш базовий аналіз авто',
  'За потреби відкриваєш PRO-звіт після оплати',
];

const benefits = [
  'Швидка перевірка перед дзвінком продавцю',
  'Фокус на ризиках, а не на зайвій інформації',
  'Зрозумілий результат без технічної каші',
];

export function AutoriaMvp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createAnalysis(url);
      setResult(response);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Не вдалося виконати аналіз');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border px-3 py-1 text-sm text-slate-600">
              Одна функція — швидка перевірка авто за посиланням
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Перевір авто з AUTO.RIA перед покупкою
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Встав посилання на оголошення і отримай зрозумілий базовий аналіз. Якщо потрібно — відкрий PRO-звіт з деталями, ризиками та рекомендацією.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border bg-slate-100 p-6 shadow-sm">
            <div className="space-y-4 rounded-2xl bg-white p-6">
              <h2 className="text-lg font-semibold">Як це працює</h2>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={step} className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Проаналізувати оголошення</h2>
            <p className="text-sm leading-6 text-slate-600">
              Працюємо тільки з AUTO.RIA URL. Без VIN-форм, без зайвих кроків, тільки потрібна функція.
            </p>
          </div>
          <div className="grid gap-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="rounded-2xl border bg-white p-4 text-sm text-slate-700 shadow-sm">
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <AnalysisForm loading={loading} error={error} onSubmit={handleSubmit} />
          {result?.stage === 'free' ? <FreeResult result={result} /> : null}
          {result?.stage === 'paywall' ? <Paywall result={result} /> : null}
          {result?.stage === 'pro' ? <ProResult result={result} /> : null}
        </div>
      </section>
    </div>
  );
}
