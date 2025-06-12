import {inject, Injectable, signal} from '@angular/core';
import {InvoiceApiService} from '@infrastructure/api';
import {SessionService} from '@application/services';
import {Observable, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class InvoiceService {
  private _api = inject(InvoiceApiService);
  private _session = inject(SessionService);

  private _invoices = signal<unknown>(null);

  public invoices = this._invoices.asReadonly();

  public loadInvoices(): Observable<unknown> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._api.getInvoices(shop.id, {
      limit: 50,
      offset: 0,
    }).pipe(tap((result) => this._invoices.set(result)));
  }
}
