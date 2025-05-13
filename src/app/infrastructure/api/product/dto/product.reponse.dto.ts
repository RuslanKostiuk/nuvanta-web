export type ProductResponseDto = {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: { amount: number; currency: string };
  stock: number;
  isActive: boolean;
  categoryId: string;
  shopId: string;
  soldCount: number;
  popularityThreshold?: number;
  images: string[];
}
