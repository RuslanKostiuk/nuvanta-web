import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiClientService} from '@infrastructure/api';
import {ProductResponseDto} from '@infrastructure/api/product/dto/product.reponse.dto';
import {ProductMutateDto} from '@infrastructure/api/product/dto/update-product.dto';
import {ProductSearch} from '@domain/models/product-search.model';

@Injectable({providedIn: 'root'})
export class ProductApiService {
  private readonly _api = inject(ApiClientService);

  getProducts(shopId: string, params?: Record<string, any>): Observable<ProductResponseDto[]> {
    const queryParams = params || {};
    queryParams['lang'] = queryParams['lang'] ?? 'en';
    return this._api.get(`shops/${shopId}/products`, queryParams);
  }

  searchProducts(shopId: string, term: string): Observable<ProductSearch[]> {
    return this._api.get(`shops/${shopId}/products/search`, {term});
  }

  getTotal(shopId: string, params?: Record<string, any>): Observable<number> {
    const queryParams = params || {};
    queryParams['lang'] = queryParams['lang'] ?? 'en';

    return this._api.get(`shops/${shopId}/products/total`, queryParams);
  }

  getById(id: string, shopId: string): Observable<ProductResponseDto> {
    return this._api.get(`shops/${shopId}/products/${id}`);
  }

  update(shopId: string, productId: string, dto: ProductMutateDto): Observable<ProductResponseDto> {
    return this._api.put(`shops/${shopId}/products/${productId}`, dto);
  }

  create(shopId: string, productId: string, dto: ProductMutateDto): Observable<ProductResponseDto> {
    return this._api.post(`shops/${shopId}/products/${productId}`, dto);
  }
}
