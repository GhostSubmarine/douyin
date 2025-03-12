export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export const paginateResponse = <T>(data: T[], total: number, page: number, limit: number): PaginatedResponse<T> => ({
  data,
  meta: {
    currentPage: page,
    itemsPerPage: limit,
    totalItems: total,
    totalPages: Math.ceil(total / limit)
  }
});