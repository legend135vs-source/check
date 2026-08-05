'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAnalysis } from '@/lib/api/analysis.api';
import type { AnalysisResponse } from '@/types/analysis.types';
import { ProResult } from '@/components/mvp/ProResult';
import { Paywall } from '@/components/mvp/Paywall';
import { FreeResult } from '@/components/mvp/FreeResult';

function AnalysisSuccessContent() {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysis_id');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAnalysis() {
      if (!analysisId) {
        setError('Не знайдено analysis_id у URL');
        setLoading(false);
        return;
      }

      try {
        const response = await getAnalysis(analysisId);
        if (!cancelled) {
          setResult(response);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Не вдалося завантажити аналіз');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAnalysis();

    return () => {
      cancelled = true;
    };
  }, [analysisId]);

  return (
    <main className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Результат аналізу</h1>
        <p className="text-sm text-gray-600">Сторінка після повернення з оплати.</p>
      </div>

      {loading ? <div className="rounded-2xl border p-6 text-sm">Завантаження...</div> : null}
      {error ? <div className="rounded-2xl border p-6 text-sm text-red-600">{error}</div> : null}

      {result?.stage === 'free' ? <FreeResult result={result} /> : null}
      {result?.stage === 'paywall' ? <Paywall result={result} /> : null}
      {result?.stage === 'pro' ? <ProResult result={result} /> : null}
    </main>
  );
}

export default function AnalysisSuccessPage() {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm">Завантаження...</main>}>
      <AnalysisSuccessContent />
    </Suspense>
  );
}
