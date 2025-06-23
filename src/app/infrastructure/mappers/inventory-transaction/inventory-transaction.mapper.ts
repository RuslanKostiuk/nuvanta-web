import {
  InventoryTransactionListResponseDto
} from '@infrastructure/api/inventory-transaction/dto/inventory-transaction-list-response.dto';
import {InventoryTransactionPreview} from '@domain/models/inventory-transaction.preview';
import {
  InventoryTransactionListFilterParams
} from '@infrastructure/api/inventory-transaction/dto/inventory-transaction-list-query-params.dto';
import {DateUtils} from '@shared/utils/date.utils';

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
}
