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

  const normalizedError = error?.toLowerCase() ?? '';
  const isAiUnavailable = normalizedError.includes('openai_api_key') || normalizedError.includes('openai');
  const isNetworkIssue =
    normalizedError.includes('не вдалося підключитися') ||
    normalizedError.includes('failed to fetch') ||
    normalizedError.includes('cors') ||
    normalizedError.includes('network');

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
          className="w-full rounded-xl border px-4 py-3 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !url.trim()}
        className="rounded-xl bg-black px-4 py-3 text-white disabled:opacity-50"
      >
        {loading ? 'Аналізуємо...' : 'Проаналізувати'}
      </button>

      {error ? (
        <div className="space-y-1 text-sm">
          <p className="text-red-600">{error}</p>
          {isNetworkIssue ? (
            <p className="text-slate-600">
              Схоже на проблему з&apos;єднання між сайтом і сервером аналізу. Якщо помилка повторюється — сервіс
              тимчасово недоступний, спробуйте пізніше.
            </p>
          ) : null}
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
