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
  discount: number | null;
  discountType: 'fixed' | 'percentage' | null;
  finalPrice: number;
}
