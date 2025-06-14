import {InvoiceListResponseDto} from '@infrastructure/api/invoice/dto/invoice-list-response.dto';
import {InvoicePreview} from '@domain/models/invoice.preview';

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
}
