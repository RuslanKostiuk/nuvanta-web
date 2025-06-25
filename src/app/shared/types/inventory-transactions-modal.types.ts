export type InItemType = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
}


export type OutItemType = {
  productId: string;
  productName: string;
  quantity: number;
  discount: number | null;
  discountType: 'fixed' | 'percentage' | null;
  finalPrice: number;
}
