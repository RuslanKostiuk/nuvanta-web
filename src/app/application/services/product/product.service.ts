import {inject, Injectable, signal} from '@angular/core';
import {map} from 'rxjs';
import {ProductApiService} from '@infrastructure/api/product/product-api.service';
import {Product} from '@domain/models';
import {ProductMapper} from '@infrastructure/mappers';

@Injectable({providedIn: 'root'})
export class ProductService {
  private readonly _api = inject(ProductApiService);
  private readonly _products = signal<Product[] | null>(null);

  readonly products = this._products.asReadonly();

  fetchAll() {
    return this._api.getProducts().pipe(
      map(dto => ProductMapper.fromDtoArray(dto)),
      map(products => {
        this._products.set(products);
        return products;
      })
    );
  }

  getById(id: string): Product | null {
    return this._products()?.find(p => p.id === id) ?? null;
  }
}
