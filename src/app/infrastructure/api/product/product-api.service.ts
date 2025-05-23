import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiClientService} from '@infrastructure/api';
import {ProductResponseDto} from '@infrastructure/api/product/dto/product.reponse.dto';


@Injectable({providedIn: 'root'})
export class ProductApiService {
  private readonly _api = inject(ApiClientService);

  getProducts(shopId: string, lang = 'en'): Observable<ProductResponseDto[]> {
    return this._api.get(`shops/${shopId}/products`, {lang});
  }

  getById(id: string): Observable<ProductResponseDto> {
    return this._api.get(`products/${id}`);
  }
}
