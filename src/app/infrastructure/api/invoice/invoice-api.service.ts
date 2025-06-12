import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '@infrastructure/api';
import {InvoiceListFilter} from '@infrastructure/api/invoice/dto/invoice-list-filter.dto';
import {Observable} from 'rxjs';
import {InvoiceListResponseDto} from '@infrastructure/api/invoice/dto/invoice-list-response.dto';

@Injectable({providedIn: 'root'})
export class InvoiceApiService {
  private _api = inject(ApiClientService);

  getInvoices(shopId: string, params: InvoiceListFilter): Observable<InvoiceListResponseDto[]> {
    return this._api.get(`shops/${shopId}/invoices`, params);
  }
}
