'use client';

import { useState } from 'react';

interface AnalysisFormProps {
  loading: boolean;
  error: string | null;
  onSubmit: (url: string) => Promise<void> | void;
}

export function AnalysisForm({ loading, error, onSubmit }: AnalysisFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url.trim()) return;
    await onSubmit(url.trim());
  };

  const isAiUnavailable = error?.toLowerCase().includes('openai_api_key') || error?.toLowerCase().includes('openai');

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <label htmlFor="autoria-url" className="text-sm font-medium">
          Посилання на AUTO.RIA
        </label>
        <input
          id="autoria-url"
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://auto.ria.com/..."
          className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-slate-900"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !url.trim()}
        className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Аналізуємо...' : 'Проаналізувати'}
      </button>

      {error ? (
        <div className="space-y-1 text-sm">
          <p className="text-red-600">{error}</p>
          {isAiUnavailable ? (
            <p className="text-slate-600">
              Зараз AI-аналіз недоступний (немає ключа або проблема з провайдером). Базові дані оголошення все одно можна
              переглянути напряму на AUTO.RIA.
            </p>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
