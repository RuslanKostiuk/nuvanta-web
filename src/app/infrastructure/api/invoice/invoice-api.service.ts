import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '@infrastructure/api';
import {
  InvoiceListFilterParams,
  InvoiceListQueryParamsDto
} from '@infrastructure/api/invoice/dto/invoice-list-query-params.dto';
import {Observable} from 'rxjs';
import {InvoiceListResponseDto} from '@infrastructure/api/invoice/dto/invoice-list-response.dto';
import {InvoiceSubtype} from '@domain/models/invoice-subtype.model';

@Injectable({providedIn: 'root'})
export class InvoiceApiService {
  private _api = inject(ApiClientService);

  getInvoices(shopId: string, params: InvoiceListQueryParamsDto): Observable<InvoiceListResponseDto[]> {
    return this._api.get(`shops/${shopId}/invoices`, params);
  }

  getTotal(shopId: string, params?: InvoiceListFilterParams): Observable<number> {
    return this._api.get(`shops/${shopId}/invoices/total`, params);
  }

  getSubtypes(shopId: string): Observable<InvoiceSubtype[]> {
    return this._api.get(`shops/${shopId}/invoices/subtype-list`);
  }
}
