import { Ref, UnwrapRef } from 'vue';
import { AxiosError } from 'axios';
import { QTable } from 'quasar';

export interface ErrorState {
  error: {
    response: {
      items: Record<string, string[]>;
      has(key: string): boolean;
      first(key: string): string | null;
      set(items: Record<string, string[]>): void;
      reset(): void;
    }
  }
}

export type ErrorInstance = {
  [K in keyof ErrorState]: Ref<ErrorState[K]>;
}

export interface TablePagination {
  sortBy?: string | null;
  descending?: boolean | null;
  rowsNumber?: number | null;
  page: number;
  rowsPerPage: number;
}

export interface TablePaginable<T = string> {
  pagination: TablePagination;
  filter: T
}

export type TableProperty = {
  url: string;
  pagination?: TablePagination | null
}

export interface TableState<R> {
  rows: R[];
  loading: boolean;
  pagination: TablePagination | null;
}

export type TableResource<R> = {
  rows: Ref<UnwrapRef<R[]>>;
  loading: Ref<boolean>;
  pagination: Ref<TablePagination | null>;
  onLoad: { (doneFn?: CallableFunction | undefined): void };
  onRequest: QTable['requestServerInteraction'];
}


export interface TableResponse<R = unknown> {
  data: R[];
  message?: string;
  links?: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    links: { active: boolean, label: string, url: string | null }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export type ErrorResponse = AxiosError<{
  message?: string
}>
