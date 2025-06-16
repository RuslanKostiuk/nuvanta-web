import {SortParams} from '@shared/types/sort-params.type';

export type InvoiceListFilterParams = {
  from?: string;
  to?: string;
  type?: 'IN' | 'OUT';
  subtype?: string;
  productCount?: number;
  totalQuantity?: number;
  totalValue?: number;
  note?: string
}

export type InvoiceListQueryParamsDto = InvoiceListFilterParams & SortParams & {
  limit: number;
  offset: number;
}

