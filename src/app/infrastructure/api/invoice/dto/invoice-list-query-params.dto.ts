export type InvoiceListFilterParams = {
  from?: string;
  to?: string;
  type?: 'IN' | 'OUT';
  subtype?: string;
  limit: number;
  offset: number;
}

export type InvoiceListSortParams = {
  operationDate?: 'asc' | 'desc';
}

export type InvoiceListQueryParamsDto = InvoiceListFilterParams & InvoiceListSortParams;

