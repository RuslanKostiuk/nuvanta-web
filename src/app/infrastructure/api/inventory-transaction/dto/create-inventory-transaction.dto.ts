export type CreateInventoryTransactionDto = {
  operationDate: Date;
  type: 'IN' | 'OUT';
  subtypeId: string;
  note: string | null;
  isActive: boolean;
  items: CreateInventoryTransactionItemDto[]
}

export type CreateInventoryTransactionItemDto = {
  productId: string;
  quantity: number;
  unitPrice: number | null;
  discount: number | null;
  discountType: 'fixed' | 'percentage' | null;
}
