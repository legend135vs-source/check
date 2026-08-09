import type { AnalysisResponse } from '@/types/analysis.types';
import { getSessionId, setSessionId } from '@/lib/utils/session';

const DIRECT_API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
const PROXY_API_PREFIX = '/api/backend';

export function getApiBaseUrl(): string {
  return DIRECT_API_BASE_URL || PROXY_API_PREFIX;
}

async function parseError(response: Response): Promise<string> {
  const fallback = `Request failed with status ${response.status}`;

  try {
    const data = await response.json();
    if (typeof data?.detail === 'string' && data.detail.trim()) {
      return data.detail;
    }
    if (typeof data?.message === 'string' && data.message.trim()) {
      return data.message;
    }
    return fallback;
  } catch {
    try {
      const text = await response.text();
      return text || fallback;
    } catch {
      return fallback;
    }
  }
}

function buildNetworkError(url: string): Error {
  return new Error(
    [
      `Не вдалося підключитися до сервера (${url}).`,
      'Можливі причини: backend тимчасово недоступний, CORS-обмеження або збій мережі.',
      'Спробуйте ще раз за кілька секунд.',
    ].join(' '),
  );
}

interface RequestOptions {
  init?: RequestInit;
  allowDirectFallback?: boolean;
}

async function request<T>(path: string, options?: RequestOptions): Promise<T> {
  const attempt = async (baseUrl: string): Promise<T> => {
    const url = `${baseUrl}${path}`;
    const headers = new Headers(options?.init?.headers || {});
    headers.set('Content-Type', 'application/json');

    const sessionId = getSessionId();
    if (sessionId) {
      headers.set('x-session-id', sessionId);
    }

    let response: Response;
    try {
      response = await fetch(url, {
        ...options?.init,
        headers,
        cache: 'no-store',
      });
    } catch {
      throw buildNetworkError(url);
    }

    const nextSessionId = response.headers.get('x-session-id');
    if (nextSessionId) {
      setSessionId(nextSessionId);
    }

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return response.json() as Promise<T>;
  };

  if (DIRECT_API_BASE_URL) {
    try {
      return await attempt(DIRECT_API_BASE_URL);
    } catch (error) {
      const shouldFallback =
        options?.allowDirectFallback !== false &&
        error instanceof Error &&
        error.message.startsWith('Не вдалося підключитися до сервера');
      if (!shouldFallback) {
        throw error;
      }
      return attempt(PROXY_API_PREFIX);
    }
  }

  return attempt(PROXY_API_PREFIX);
}

export async function createAnalysis(autoriaUrl: string): Promise<AnalysisResponse> {
  return request<AnalysisResponse>('/api/v1/analysis', {
    init: {
      method: 'POST',
      body: JSON.stringify({ url: autoriaUrl }),
    },
  });
}

export async function getAnalysis(analysisId: string): Promise<AnalysisResponse> {
  return request<AnalysisResponse>(`/api/v1/analysis/${encodeURIComponent(analysisId)}`, {
    init: { method: 'GET' },
  });
}
