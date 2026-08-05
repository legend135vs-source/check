'use client';

import { useState } from 'react';
import { createAnalysis } from '@/lib/api/analysis.api';
import type { AnalysisResponse } from '@/types/analysis.types';
import { AnalysisForm } from './AnalysisForm';
import { FreeResult } from './FreeResult';
import { Paywall } from './Paywall';
import { ProResult } from './ProResult';

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
    <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">AUTO.RIA аналіз</h1>
        <p className="text-sm text-gray-600">
          Вставте посилання на оголошення і отримайте базовий аналіз, а за потреби — PRO-звіт після оплати.
        </p>
      </div>

      <AnalysisForm loading={loading} error={error} onSubmit={handleSubmit} />

      {result?.stage === 'free' ? <FreeResult result={result} /> : null}
      {result?.stage === 'paywall' ? <Paywall result={result} /> : null}
      {result?.stage === 'pro' ? <ProResult result={result} /> : null}
    </div>
  );
}
