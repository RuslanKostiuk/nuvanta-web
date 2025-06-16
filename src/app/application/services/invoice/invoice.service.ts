import {inject, Injectable, signal} from '@angular/core';
import {InvoiceApiService} from '@infrastructure/api';
import {SessionService} from '@application/services';
import {map, Observable, tap} from 'rxjs';
import {InvoicePreview} from '@domain/models/invoice.preview';
import {InvoiceMapper} from '@infrastructure/mappers/invoice/invoice.mapper';
import {
  InvoiceListFilterParams,
  InvoiceListQueryParamsDto
} from '@infrastructure/api/invoice/dto/invoice-list-query-params.dto';
import {InvoiceSubtype} from '@domain/models/invoice-subtype.model';

@Injectable({providedIn: 'root'})
export class InvoiceService {
  private _api = inject(InvoiceApiService);
  private _session = inject(SessionService);

  private _invoices = signal<InvoicePreview[]>([]);
  public invoices = this._invoices.asReadonly();
  private _total = signal<number>(0)
  public total = this._total.asReadonly();

  private _subtypes = signal<InvoiceSubtype[]>([]);
  public subtypes = this._subtypes.asReadonly();

  constructor() {
    this.loadSubtypes();
  }


  public loadInvoices(params: InvoiceListQueryParamsDto): Observable<unknown> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._api.getInvoices(shop.id, params).pipe(
      map((result) => result.map(InvoiceMapper.toPreview)),
      tap((result) => this._invoices.update((x) => [...x, ...result])),
    );
  }

  clearInvoices(): void {
    this._invoices.set([]);
  }

  loadTotal(params?: InvoiceListFilterParams): Observable<number> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._api.getTotal(shop.id, params).pipe(
      tap((result) => this._total.set(result)),
    );
  }

  private loadSubtypes(): void {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    this._api.getSubtypes(shop.id).subscribe((result) => this._subtypes.set(result));
  }
}
