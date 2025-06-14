import {inject, Injectable, signal} from '@angular/core';
import {InvoiceApiService} from '@infrastructure/api';
import {SessionService} from '@application/services';
import {map, Observable, tap} from 'rxjs';
import {InvoicePreview} from '@domain/models/invoice.preview';
import {InvoiceMapper} from '@infrastructure/mappers/invoice/invoice.mapper';

@Injectable({providedIn: 'root'})
export class InvoiceService {
  private _api = inject(InvoiceApiService);
  private _session = inject(SessionService);

  private _invoices = signal<InvoicePreview[]>([]);

  public invoices = this._invoices.asReadonly();

  public loadInvoices(params: any): Observable<unknown> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._api.getInvoices(shop.id, {
      limit: params.limit,
      offset: params.offset,
    }).pipe(
      map((result) => result.map(InvoiceMapper.toPreview)),
      tap((result) => this._invoices.update((x) => [...x, ...result])),
    );
  }
}
