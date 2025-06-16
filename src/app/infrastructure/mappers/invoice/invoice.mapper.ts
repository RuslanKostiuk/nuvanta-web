import {InvoiceListResponseDto} from '@infrastructure/api/invoice/dto/invoice-list-response.dto';
import {InvoicePreview} from '@domain/models/invoice.preview';
import {InvoiceListFilterParams,} from '@infrastructure/api/invoice/dto/invoice-list-query-params.dto';
import {DateUtils} from '@shared/utils/date.utils';

export class InvoiceMapper {
  static toPreview(dto: InvoiceListResponseDto): InvoicePreview {
    return new InvoicePreview(
      dto.id,
      dto.operationDate,
      dto.type,
      dto.subtype,
      dto.note,
      dto.productCount,
      dto.totalQuantity,
      dto.totalValue,
    )
  }

  public static mapFilters(filters: Record<string, any>): InvoiceListFilterParams {
    const result: InvoiceListFilterParams = {};

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

    if (filters.operationDate?.startDate && filters.operationDate?.endDate) {
      result.from = DateUtils.formatDate(filters.operationDate.startDate);
      result.to = DateUtils.formatDate(filters.operationDate.endDate);
    }

    return result;
  }
}
