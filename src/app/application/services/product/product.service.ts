import {effect, inject, Injectable, signal} from '@angular/core';
import {map} from 'rxjs';
import {ProductApiService} from '@infrastructure/api/product/product-api.service';
import {ProductMapper} from '@infrastructure/mappers';
import {SessionService} from '@application/services';
import {ProductPreview} from '@domain/models/product-preview.model';
import {ProductFull} from '@domain/models';

@Injectable({providedIn: 'root'})
export class ProductService {
  private readonly _api = inject(ProductApiService);
  private readonly _session = inject(SessionService);
  private readonly _products = signal<ProductPreview[] | null>(null);

  readonly products = this._products.asReadonly();

  constructor() {
    effect(() => {
      const shop = this._session.activeShop();
      if (!shop) return;

      this.fetchAll().subscribe();
    });
  }

  fetchAll() {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');


    return this._api.getProducts(shop.id).pipe(
      map(dto => ProductMapper.toPreviewArray(dto)),
      map(products => {
        this._products.set(products);
        return products;
      })
    );
  }

  getById(id: string): ProductFull | null {
    return null;
    // return this._products()?.find(p => p.id === id) ?? null;
  }
}
