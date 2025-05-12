import { ShopResponseDto } from '@infrastructure/api/shop/dto';
import { Shop } from '@domain/models';

export class ShopMapper {
  static fromDto(dto: ShopResponseDto): Shop {
    return new Shop(dto.id, dto.name, dto.namespace, dto.isActive ?? true, {
      type: dto.subscriptionType,
      validUntil: dto.subscriptionValidUntil ? new Date(dto.subscriptionValidUntil) : null,
    });
  }

  static fromDtoArray(dtos: ShopResponseDto[]): Shop[] {
    return dtos.map(ShopMapper.fromDto);
  }
}
