type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class ApiError extends Error {
  status: number;
  url: string;
  body?: unknown;

  constructor(message: string, status: number, url: string, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
    this.body = body;
  }
}

/** 전역 설정 */
const API_BASE = '/api'; // 프론트 기준. 프록시가 /api/v1로 전달
const DEFAULT_TIMEOUT = 15000; // 15s

/** 필요 시 교체 가능한 토큰 공급자 (JWT 등) */
let tokenProvider: (() => string | null) | null = null;
/** 쿠키/세션을 쓸지 여부 (CORS allowCredentials(true)와 세트) */
let useCredentials = true;

export const apiConfig = {
  setTokenProvider(getter: () => string | null) {
    tokenProvider = getter;
    return apiConfig;
  },
  setUseCredentials(flag: boolean) {
    useCredentials = flag;
    return apiConfig;
  },
  setTimeout(ms: number) {
    (globalThis as any).__API_TIMEOUT__ = ms;
    return apiConfig;
  },
};

/** 쿼리스트링 빌더 */
export function toQuery(params?: Record<string, any>): string {
  if (!params) return '';
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) v.forEach((item) => usp.append(k, String(item)));
    else usp.set(k, String(v));
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : '';
}

/** 공통 요청 함수 */
async function request<T>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
    query?: Record<string, any>;
    timeoutMs?: number;
    // 응답을 그대로 받고 싶을 때 (blob/text 등)
    rawResponse?: boolean;
  } = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    query,
    timeoutMs = (globalThis as any).__API_TIMEOUT__ ?? DEFAULT_TIMEOUT,
    rawResponse = false,
  } = options;

  const url = `${API_BASE}${path}${toQuery(query)}`;

  const h: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  };

  // 토큰 헤더 (옵션)
  const token = tokenProvider?.();
  if (token) {
    h.Authorization = `Bearer ${token}`;
  }

  // JSON 바디 자동 처리
  let payload: BodyInit | undefined;
  if (body !== undefined && body !== null) {
    if (body instanceof FormData || body instanceof Blob) {
      payload = body; // Content-Type은 브라우저가 자동 설정
    } else {
      h['Content-Type'] = 'application/json';
      payload = JSON.stringify(body);
    }
  }

  // 타임아웃 + Abort
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  const resp = await fetch(url, {
    method,
    headers: h,
    body: payload,
    credentials: useCredentials ? 'include' : 'same-origin',
    signal: controller.signal,
  })
    .catch((e) => {
      if (e.name === 'AbortError') {
        throw new ApiError('API request timeout', 408, url);
      }
      throw e;
    })
    .finally(() => clearTimeout(id));

  if (rawResponse) {
    // @ts-expect-error - 호출부에서 타입 보장
    return resp;
  }

  // 204 No Content 대응
  if (resp.status === 204) {
    return undefined as unknown as T;
  }

  let data: unknown;
  const text = await resp.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // JSON 아님
    data = text;
  }

  if (!resp.ok) {
    const message = (data as any)?.message || `${resp.status} ${resp.statusText}`;
    throw new ApiError(message, resp.status, url, data);
  }

  return data as T;
}

/** HTTP 헬퍼 */
export const http = {
  get: <T>(
    path: string,
    query?: Record<string, any>,
    opts?: Omit<Parameters<typeof request<T>>[1], 'method' | 'query'>
  ) => request<T>(path, { ...opts, method: 'GET', query }),
  post: <T>(
    path: string,
    body?: any,
    opts?: Omit<Parameters<typeof request<T>>[1], 'method' | 'body'>
  ) => request<T>(path, { ...opts, method: 'POST', body }),
  put: <T>(
    path: string,
    body?: any,
    opts?: Omit<Parameters<typeof request<T>>[1], 'method' | 'body'>
  ) => request<T>(path, { ...opts, method: 'PUT', body }),
  patch: <T>(
    path: string,
    body?: any,
    opts?: Omit<Parameters<typeof request<T>>[1], 'method' | 'body'>
  ) => request<T>(path, { ...opts, method: 'PATCH', body }),
  delete: <T>(
    path: string,
    query?: Record<string, any>,
    opts?: Omit<Parameters<typeof request<T>>[1], 'method' | 'query'>
  ) => request<T>(path, { ...opts, method: 'DELETE', query }),
};

/* ============================
 * 아래는 예시 엔드포인트 (메뉴)
 * 필요 시 같은 파일에 계속 추가해서 "한 파일"로 운용
 * ============================ */

export interface Menu {
  id: number;
  name: string;
  url: string;
  end: boolean;
  parentId?: number | null;
  sequence?: number;
  description?: string | null;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const menusApi = {
  // GET /api/v1/menus (프론트 기준 경로는 /api/menus)
  list: (query?: { q?: string; page?: number; size?: number }) => http.get<Menu[]>('/menus', query),

  // GET /api/v1/menus/{id}
  detail: (id: number) => http.get<Menu>(`/menus/${id}`),

  // POST /api/v1/menus
  create: (payload: Pick<Menu, 'name' | 'url' | 'end' | 'parentId' | 'sequence' | 'description'>) =>
    http.post<Menu>('/menus', payload),

  // PUT /api/v1/menus/{id}
  update: (
    id: number,
    payload: Partial<Pick<Menu, 'name' | 'url' | 'end' | 'parentId' | 'sequence' | 'description'>>
  ) => http.put<Menu>(`/menus/${id}`, payload),

  // PATCH /api/v1/menus/{id}
  patch: (id: number, payload: Partial<Menu>) => http.patch<Menu>(`/menus/${id}`, payload),

  // DELETE /api/v1/menus/{id}
  remove: (id: number) => http.delete<void>(`/menus/${id}`),
};
