import {ProductResponseDto} from '@infrastructure/api/product/dto';
import {ProductFull, Translation} from '@domain/models/product-full.model';
import {ProductPreview} from '@domain/models/product-preview.model';
import {ProductUpdateDto} from '@infrastructure/api/product/dto/update-product.dto';


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
      dto.details,
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

  static mapToUpdateDto(input: any): ProductUpdateDto {
    return {
      sku: input.sku,
      price: parseFloat(input.price),
      popularityThreshold: input.popularityThreshold,
      categoryId: input.categoryId,
      isActive: input.isActive,
      translations: input.translations.map((t: any) => ({
        lang: t.lang,
        name: t.name,
        description: t.description,
      })),
      details: input.details.map((d: any) => ({
        key: d.key,
        value: d.value,
      })),
      discount: input.discount?.validFrom || input.discount?.validUntil
        ? {
          amount: input.discount.amount ? parseInt(input.discount.amount) : 0,
          type: input.discount.type?.toLowerCase() || 'fixed',
          validFrom: input.discount.validFrom || undefined,
          validUntil: input.discount.validUntil || undefined,
        }
        : undefined,
    } as ProductUpdateDto;
  }
}
