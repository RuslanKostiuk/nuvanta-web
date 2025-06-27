export class ProductPreview {
  constructor(
    public readonly id: string,
    public readonly sku: string,
    public name: string,
    public description: string,
    public price: {
      amount: number;
      currency: string;
    },
    public stock: number,
    public isActive: boolean,
    public readonly categoryId: string,
    public readonly shopId: string,
    public soldCount: number,
    public popularityThreshold?: number,
    public images: { url: string; order: number }[] = [],
  ) {}

  get isPopular(): boolean {
    if (!this.popularityThreshold) return false;
    return this.soldCount >= this.popularityThreshold;
  }

  get mainImage(): string | null {
    return this.images?.length > 0 ? this.images[0].url : 'images/product-default.png';
  }
}
