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
