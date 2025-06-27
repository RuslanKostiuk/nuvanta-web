import {
  InventoryTransactionListResponseDto
} from '@infrastructure/api/inventory-transaction/dto/inventory-transaction-list-response.dto';
import {InventoryTransactionPreview} from '@domain/models/inventory-transaction.preview';
import {
  InventoryTransactionListFilterParams
} from '@infrastructure/api/inventory-transaction/dto/inventory-transaction-list-query-params.dto';
import {DateUtils} from '@shared/utils/date.utils';
import {InItemType, InventoryTransaction, OutItemType} from '@shared/types/inventory-transactions-modal.types';
import {
  CreateInventoryTransactionDto,
  CreateInventoryTransactionItemDto
} from '@infrastructure/api/inventory-transaction/dto/create-inventory-transaction.dto';

export class InventoryTransactionMapper {
  static toPreview(dto: InventoryTransactionListResponseDto): InventoryTransactionPreview {
    return new InventoryTransactionPreview(
      dto.id,
      dto.operationDate,
      dto.type,
      dto.subtype,
      dto.note,
      dto.productCount,
      dto.totalQuantity,
      dto.totalValue,
    );
  }

  public static mapFilters(filters: Record<string, any>): InventoryTransactionListFilterParams {
    const result: InventoryTransactionListFilterParams = {};

    if (filters.type) {
      result.type = filters.type;
    }

    if (filters.subtype) {
      result.subtype = filters.subtype;
    }

    if (filters.productCount) {
      result.productCount = filters.productCount;
    }

    if (filters.totalQuantity) {
      result.totalQuantity = filters.totalQuantity;
    }

    if (filters.totalValue) {
      result.totalValue = filters.totalValue;
    }

    if (filters.note) {
      result.note = filters.note;
    }

    if (filters.operationDate?.from) {
      result.from = DateUtils.formatDate(filters.operationDate.from);
    }

    if (filters.operationDate?.to) {
      result.to = DateUtils.formatDate(filters.operationDate.to);
    }

    return result;
  }

  static toDto(data: InventoryTransaction): CreateInventoryTransactionDto {
    return {
      operationDate: DateUtils.formatDate(data.operationDate) as string,
      type: data.type,
      subtypeId: data.subtype,
      note: data.note?.trim() || null,
      items: data.type === 'IN'
        ? data.items.map((x) => this.mapInItems(x as InItemType))
        : data.items.map((x) => this.mapOutItems(x as OutItemType))
    }
  }

  private static mapInItems(item: InItemType): CreateInventoryTransactionItemDto {
    return {
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      sellingPrice: null,
      discount: null,
      discountType: null,
    }
  }

  private static mapOutItems(item: OutItemType): CreateInventoryTransactionItemDto {
    return {
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: null,
      sellingPrice: item.sellingPrice,
      discount: item.discount,
      discountType: item.discountType,
    }
  }
}
