import {ProductResponseDto} from '@infrastructure/api/product/dto';
import {Product} from '@domain/models';


export class ProductMapper {
  static fromDto(dto: ProductResponseDto): Product {
    return new Product(
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
      dto.images ?? []
    );
  }

  static fromDtoArray(dtos: ProductResponseDto[]): Product[] {
    return dtos.map(this.fromDto);
  }
}
