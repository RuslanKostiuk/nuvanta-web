export interface InvoiceListFilter {
  from?: string;
  to?: string;
  type?: 'IN' | 'OUT';
  subtype?: string;
  limit: number;
  offset: number;
}
