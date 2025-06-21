import { SortParams } from '@shared/types/sort-params.type';

export type InventoryTransactionListFilterParams = {
  from?: string;
  to?: string;
  type?: 'IN' | 'OUT';
  subtype?: string;
  productCount?: number;
  totalQuantity?: number;
  totalValue?: number;
  note?: string;
};

export type InventoryTransactionListQueryParamsDto = InventoryTransactionListFilterParams &
  SortParams & {
    limit: number;
    offset: number;
  };
