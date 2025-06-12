export interface InvoiceListResponseDto {
  id: string;
  operationDate: string;
  type: 'IN' | 'OUT';
  subtype?: string;
  note?: string;
  productCount: number;
  totalQuantity: number;
  totalValue?: number;
}
