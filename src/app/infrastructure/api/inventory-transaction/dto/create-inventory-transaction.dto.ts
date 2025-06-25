export type CreateInventoryTransactionDto = {
  operationDate: string;
  type: 'IN' | 'OUT';
  subtypeId: string;
  note: string | null;
  items: CreateInventoryTransactionItemDto[]
}

export type CreateInventoryTransactionItemDto = {
  productId: string;
  quantity: number;
  unitPrice: number | null;
  sellingPrice: number | null;
  discount: number | null;
  discountType: 'fixed' | 'percentage' | null;
}
