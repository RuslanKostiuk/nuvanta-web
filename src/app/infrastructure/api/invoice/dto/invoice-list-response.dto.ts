export interface InvoiceListResponseDto {
  id: string;
  operationDate: string;
  type: 'IN' | 'OUT';
  subtype: string;
  note: string | null;
  productCount: number;
  totalQuantity: number;
  totalValue: number | null;
}
