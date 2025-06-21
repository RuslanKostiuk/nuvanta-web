import { inject, Injectable } from '@angular/core';
import { ApiClientService } from '@infrastructure/api';
import { Observable } from 'rxjs';
import { IdNameModel } from '@domain/models/id-name.model';
import { ProductCategoryModel } from '@domain/models/product-category.model';
import { ProductCategorySyncDto } from '@infrastructure/api/product-category/dto/product-category-sync.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryApiService {
  private readonly _api = inject(ApiClientService);

  public list(shopId: string): Observable<IdNameModel[]> {
    return this._api.get(`shops/${shopId}/product-categories`);
  }

  public listWithProdCount(shopId: string): Observable<ProductCategoryModel[]> {
    return this._api.get(`shops/${shopId}/product-categories/with-prod-count`);
  }

  public sync(data: ProductCategorySyncDto, shopId: string): Observable<IdNameModel[]> {
    return this._api.post(`shops/${shopId}/product-categories/sync`, data);
  }
}
