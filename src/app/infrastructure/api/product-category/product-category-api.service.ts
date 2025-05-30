import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '@infrastructure/api';
import {Observable} from 'rxjs';
import {IdNameModel} from '@domain/models/id-name.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryApiService {
  private readonly _api = inject(ApiClientService);

  public list(shopId: string): Observable<IdNameModel[]> {
    return this._api.get(`shops/${shopId}/product-categories`);
  }
}
