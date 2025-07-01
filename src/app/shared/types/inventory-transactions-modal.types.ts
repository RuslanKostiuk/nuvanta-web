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
  sellingPrice: string;
  discount: string | null;
  discountType: 'fixed' | 'percentage' | null;
  finalPrice: string;
  totalSellingPrice: string;
  totalSellingFinalPrice: string;
  discountValue: string;
  discountPercent: string;
  totalDiscount: string;
}


export type InventoryTransaction = {
  operationDate: Date;
  type: 'IN' | 'OUT';
  subtype: string;
  note: string | null;
  items: InItemType[] | OutItemType[];
}
