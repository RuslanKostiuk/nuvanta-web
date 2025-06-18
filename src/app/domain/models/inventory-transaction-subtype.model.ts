import {IdNameModel} from '@domain/models/id-name.model';

export type InventoryTransactionSubtype = IdNameModel & {
  type: 'IN' | 'OUT';
}
