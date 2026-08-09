import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length',
]);

function getBackendBaseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, '');
}

function buildTargetUrl(request: NextRequest, pathSegments: string[]): string | null {
  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) return null;
  const path = (pathSegments ?? []).map(encodeURIComponent).join('/');
  const search = request.nextUrl.search ?? '';
  return `${baseUrl}/${path}${search}`;
}

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const targetUrl = buildTargetUrl(request, path);

  if (!targetUrl) {
    return NextResponse.json(
      { detail: 'API URL не налаштований на сервері фронтенда (NEXT_PUBLIC_API_URL відсутній).' },
      { status: 503 },
    );
  }

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
  const body = hasBody ? await request.text() : undefined;

  let upstream: Response;
  try {
    upstream = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: 'no-store',
      redirect: 'manual',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return NextResponse.json(
      { detail: `Backend недоступний через проксі (${targetUrl}): ${message}` },
      { status: 502 },
    );
  }

  const responseHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  const payload = await upstream.text();
  return new NextResponse(payload, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE, proxy as OPTIONS };
