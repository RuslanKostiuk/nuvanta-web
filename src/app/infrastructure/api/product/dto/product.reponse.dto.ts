export interface ProductResponseDto {
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
  images: { id: string; url: string; order: number }[];
  translations?: {
    lang: string;
    name: string;
    description: string;
  }[];
  details?: {
    key: string;
    value: string;
  }[];
  discount?: {
    amount: number;
    type: 'FIXED' | 'PERCENTAGE';
    validFrom?: string;
    validUntil?: string;
  };
}
