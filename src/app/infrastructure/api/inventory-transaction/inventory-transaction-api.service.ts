import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '@infrastructure/api';
import {
  InventoryTransactionListFilterParams,
  InventoryTransactionListQueryParamsDto,
} from '@infrastructure/api/inventory-transaction/dto/inventory-transaction-list-query-params.dto';
import {Observable} from 'rxjs';
import {
  InventoryTransactionListResponseDto
} from '@infrastructure/api/inventory-transaction/dto/inventory-transaction-list-response.dto';
import {InventoryTransactionSubtype} from '@domain/models/inventory-transaction-subtype.model';
import {
  CreateInventoryTransactionDto
} from '@infrastructure/api/inventory-transaction/dto/create-inventory-transaction.dto';
import {InventoryTransaction} from '@shared/types/inventory-transactions-modal.types';

@Injectable({providedIn: 'root'})
export class InventoryTransactionApiService {
  private _api = inject(ApiClientService);

  getInventoryTransactions(
    shopId: string,
    params: InventoryTransactionListQueryParamsDto,
  ): Observable<InventoryTransactionListResponseDto[]> {
    return this._api.get(`shops/${shopId}/inventory-transactions`, params);
  }

  getTransactionById(shopId: string, id: string): Observable<InventoryTransaction> {
    return this._api.get(`shops/${shopId}/inventory-transactions/${id}`);
  }

  getTotal(shopId: string, params?: InventoryTransactionListFilterParams): Observable<number> {
    return this._api.get(`shops/${shopId}/inventory-transactions/total`, params);
  }

  getSubtypes(shopId: string): Observable<InventoryTransactionSubtype[]> {
    return this._api.get(`shops/${shopId}/inventory-transactions/subtype-list`);
  }

  create(shopId: string, dto: CreateInventoryTransactionDto): Observable<unknown> {
    return this._api.post(`shops/${shopId}/inventory-transactions`, dto);
  }
}
