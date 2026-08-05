import type { AnalysisResponse } from '@/types/analysis.types';
import { getSessionId, setSessionId } from '@/lib/utils/session';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers || {});
  headers.set('Content-Type', 'application/json');

  const sessionId = getSessionId();
  if (sessionId) {
    headers.set('x-session-id', sessionId);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });

  const nextSessionId = response.headers.get('x-session-id');
  if (nextSessionId) {
    setSessionId(nextSessionId);
  }

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<T>;
}

export async function createAnalysis(autoriaUrl: string): Promise<AnalysisResponse> {
  return request<AnalysisResponse>('/api/v1/analysis', {
    method: 'POST',
    body: JSON.stringify({ url: autoriaUrl }),
  });
}

export async function getAnalysis(analysisId: string): Promise<AnalysisResponse> {
  return request<AnalysisResponse>(`/api/v1/analysis/${analysisId}`, {
    method: 'GET',
  });
}
