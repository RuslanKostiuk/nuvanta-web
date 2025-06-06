import {ProductResponseDto} from '@infrastructure/api/product/dto';
import {ProductFull, Translation} from '@domain/models/product-full.model';
import {ProductPreview} from '@domain/models/product-preview.model';
import {Image, ProductMutateDto} from '@infrastructure/api/product/dto/update-product.dto';
import {DateUtils} from '@shared/utils/date.utils';
import {UploadUrlResponse} from '@infrastructure/api/product-image/dto/upload-url.response';


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
      dto.images,
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
      dto.images,
    );
  }

  static mapToUpdateDto(input: any, uploadData: UploadUrlResponse[] | null, translations: Translation[] = []): ProductMutateDto | undefined {
    const primaryTranslation = translations[0] || {};

    primaryTranslation.name = input.name;
    primaryTranslation.description = input.description;
    primaryTranslation.lang = primaryTranslation.lang ?? 'en';
    
    translations[0] = primaryTranslation;


    return {
      sku: input.sku,
      price: parseFloat(input.price),
      popularityThreshold: input.popularityThreshold,
      categoryId: input.categoryId,
      active: input.isActive,
      translations,
      // translations: input.translations.map((t: any) => ({
      //   lang: t.lang,
      //   name: t.name,
      //   description: t.description,
      // })),
      details: input.details.map((d: any) => ({
        key: d.key,
        value: d.value,
      })),
      discount: input.discount?.validFrom || input.discount?.validUntil
        ? {
          amount: input.discount.amount ? parseFloat(input.discount.amount) : 0,
          type: input.discount.type || 'fixed',
          validFrom: DateUtils.formatDate(input.discount.validFrom),
          validUntil: DateUtils.formatDate(input.discount.validUntil),
        }
        : undefined,
      images: this.getImageUpdateParams(input.images, uploadData),
    };
  }

  private static getImageUpdateParams(images: any, uploadData: UploadUrlResponse[] | null): Image[] {
    if (!images?.length) {
      return [];
    }

    let index: number = 0;

    return images.map((image: any, i: number): Image => {
      const isNewImage = (image.id as string).startsWith('temp_');
      return {
        id: isNewImage ? null : image.id,
        key: isNewImage && uploadData ? uploadData[index++].key : null,
        order: i + 1,
      }
    });
  }
}
