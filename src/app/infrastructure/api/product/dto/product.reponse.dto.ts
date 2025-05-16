export interface ProductResponseDto {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: { amount: number; currency: string; };
  stock: number;
  isActive: boolean;
  categoryId: string;
  shopId: string;
  soldCount: number;
  popularityThreshold?: number;
  images: string[];
  translations?: {
    lang: string;
    name: string;
    description: string;
  }[];
  details?: Record<string, string>;
  discount?: {
    amount: number;
    type: 'FIXED' | 'PERCENTAGE';
    validFrom?: string;
    validUntil?: string;
  };
}
