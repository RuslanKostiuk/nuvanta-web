export interface Translation {
  lang: string;
  name: string;
  description: string;
}

export interface Detail {
  key: string;
  value: string;
}

export interface Discount {
  amount?: number;
  type?: 'FIXED' | 'PERCENTAGE';
  validFrom?: string;
  validUntil?: string;
}

export interface ProductUpdateDto {
  sku: string;
  price: number;
  active: boolean;
  categoryId: string;
  currencyCode?: string;
  popularityThreshold: number;
  translations: Translation[];
  details: Detail[];
  discount?: Discount;
}
