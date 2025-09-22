export interface IPagination {
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  empty: boolean;
  first: boolean;
  last: boolean;
  pageNumber: number;
  pageSize: number;
}