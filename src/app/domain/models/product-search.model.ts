export type ProductSearch = {
  productId: string;
  sku: string;
  stock: number;
  productName: string;
  price: number;
  discount: number | null;
  category: string;
  discountType: string | null;
  fullName: string;
}
