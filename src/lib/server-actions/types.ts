interface PaginationData<T> {
  count: number;
  exceedCount: boolean;
  exceedTotalPages: boolean;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page: number;
  result: Array<T>;
  totalPages: number;
}

export type { PaginationData };
