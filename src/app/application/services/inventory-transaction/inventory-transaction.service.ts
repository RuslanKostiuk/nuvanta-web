import {inject, Injectable, signal} from '@angular/core';
import {InventoryTransactionApiService} from '@infrastructure/api';
import {SessionService} from '@application/services';
import {map, Observable, tap} from 'rxjs';
import {InventoryTransactionPreview} from '@domain/models/inventory-transaction.preview';
import {InventoryTransactionMapper} from '@infrastructure/mappers/inventory-transaction/inventory-transaction.mapper';
import {
  InventoryTransactionListFilterParams,
  InventoryTransactionListQueryParamsDto
} from '@infrastructure/api/inventory-transaction/dto/inventory-transaction-list-query-params.dto';
import {InventoryTransactionSubtype} from '@domain/models/inventory-transaction-subtype.model';

@Injectable({providedIn: 'root'})
export class InventoryTransactionService {
  private _api = inject(InventoryTransactionApiService);
  private _session = inject(SessionService);

  private _inventoryTransactions = signal<InventoryTransactionPreview[]>([]);
  public inventoryTransactions = this._inventoryTransactions.asReadonly();
  private _total = signal<number>(0)
  public total = this._total.asReadonly();

  private _subtypes = signal<InventoryTransactionSubtype[]>([]);
  public subtypes = this._subtypes.asReadonly();

  constructor() {
    this.loadSubtypes();
  }


  public loadInventoryTransactions(params: InventoryTransactionListQueryParamsDto): Observable<unknown> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._api.getInventoryTransactions(shop.id, params).pipe(
      map((result) => result.map(InventoryTransactionMapper.toPreview)),
      tap((result) => this._inventoryTransactions.update((x) => [...x, ...result])),
    );
  }

  clearInventoryTransactions(): void {
    this._inventoryTransactions.set([]);
  }

  loadTotal(params?: InventoryTransactionListFilterParams): Observable<number> {
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
