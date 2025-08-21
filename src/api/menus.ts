import { http } from '@/lib/http';
import type { Menu } from '@/types/menu';

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
