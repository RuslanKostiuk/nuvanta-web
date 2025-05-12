import { inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { ShopApiService } from '@infrastructure/api';
import { Shop } from '@domain/models';
import { ShopMapper } from '@infrastructure/mappers';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private readonly _api = inject(ShopApiService);

  private readonly _shops = signal<Shop[] | null>(null);

  readonly shops = this._shops.asReadonly();

  fetchShops() {
    return this._api.getUserShops().pipe(
      map((dtos) => ShopMapper.fromDtoArray(dtos)),
      tap((shops) => this._shops.set(shops)),
    );
  }

  getById(id: string): Shop | null {
    return this._shops()?.find((shop) => shop.id === id) || null;
  }
}
