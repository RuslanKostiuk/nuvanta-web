import {IdNameModel} from '@domain/models/id-name.model';

export type InvoiceSubtype = IdNameModel & {
  type: 'IN' | 'OUT';
}
