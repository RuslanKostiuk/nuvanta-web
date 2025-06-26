export type InItemType = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}


export type OutItemType = {
  productId: string;
  productName: string;
  quantity: number;
  sellingPrice: number;
  discount: number | null;
  discountType: 'fixed' | 'percentage' | null;
  finalPrice: number;
  totalSellingPrice: number;
  totalSellingFinalPrice: number;
}


export type InventoryTransaction = {
  operationDate: Date;
  type: 'IN' | 'OUT';
  subtype: string;
  note: string | null;
  items: InItemType[] | OutItemType[];
}
