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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border p-6 shadow-sm">
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

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
