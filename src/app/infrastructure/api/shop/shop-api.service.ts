import { inject, Injectable } from '@angular/core';
import { ApiClientService } from '@infrastructure/api';
import { Observable } from 'rxjs';
import { ShopResponseDto } from '@infrastructure/api/shop/dto';

@Injectable({ providedIn: 'root' })
export class ShopApiService {
  private readonly _api = inject(ApiClientService);

  getUserShops(): Observable<ShopResponseDto[]> {
    return this._api.get('shops');
  }

  getShopById(shopId: string): Observable<ShopResponseDto> {
    return this._api.get(`shops/${shopId}/me`);
  }
}
