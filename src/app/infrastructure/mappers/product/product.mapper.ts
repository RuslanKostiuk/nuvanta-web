import {ProductResponseDto} from '@infrastructure/api/product/dto';
import {ProductFull, Translation} from '@domain/models/product-full.model';
import {ProductPreview} from '@domain/models/product-preview.model';


export class ProductMapper {
  static toFull(dto: ProductResponseDto): ProductFull {
    return new ProductFull(
      dto.id,
      dto.sku,
      dto.name,
      dto.description,
      {
        amount: dto.price.amount,
        currency: dto.price.currency,
      },
      dto.stock,
      dto.isActive,
      dto.categoryId,
      dto.shopId,
      dto.soldCount,
      dto.popularityThreshold,
      (dto.images ?? []).map((url, index) => ({url, order: index})),
      dto.translations as Translation[],
      dto.details as Record<string, string>,
      dto.discount,
    );
  }

  static toPreviewArray(dtos: ProductResponseDto[]): ProductPreview[] {
    return dtos.map(this.toPreview);
  }

  static toFullArray(dtos: ProductResponseDto[]): ProductFull[] {
    return dtos.map(this.toFull);
  }

  static toPreview(dto: ProductResponseDto): ProductPreview {
    return new ProductPreview(
      dto.id,
      dto.sku,
      dto.name,
      dto.description,
      {
        amount: dto.price.amount,
        currency: dto.price.currency,
      },
      dto.stock,
      dto.isActive,
      dto.categoryId,
      dto.shopId,
      dto.soldCount,
      dto.popularityThreshold,
      (dto.images ?? []).map((url, index) => ({url, order: index})),
    );
  }
}
