import { ProductPreview } from './product-preview.model';

export interface Translation {
  lang: string;
  name: string;
  description: string;
}

export interface ProductDiscount {
  amount: number;
  type: 'FIXED' | 'PERCENTAGE';
  validFrom?: string;
  validUntil?: string;
}

export class ProductFull extends ProductPreview {
  constructor(
    id: string,
    sku: string,
    name: string,
    description: string,
    price: {
      amount: number;
      currency: string;
    },
    stock: number,
    isActive: boolean,
    categoryId: string,
    shopId: string,
    soldCount: number,
    popularityThreshold: number | undefined,
    images: { id: string; url: string; order: number }[],
    public readonly translations: Translation[],
    public readonly details?: {
      key: string;
      value: string;
    }[],
    public readonly discount?: ProductDiscount,
  ) {
    super(
      id,
      sku,
      name,
      description,
      price,
      stock,
      isActive,
      categoryId,
      shopId,
      soldCount,
      popularityThreshold,
      images,
    );
  }

  getTranslation(lang: string): Translation | undefined {
    return this.translations.find((t) => t.lang === lang);
  }
}
