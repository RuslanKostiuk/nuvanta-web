import {effect, inject, Injectable, signal} from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import {ProductApiService} from '@infrastructure/api/product/product-api.service';
import {ProductMapper} from '@infrastructure/mappers';
import {SessionService} from '@application/services';
import {ProductPreview} from '@domain/models/product-preview.model';
import {ProductFull} from '@domain/models';
import {ProductImageApiService} from '@infrastructure/api/product-image/product-image-api.service';
import {ProductUpdateDto} from '@infrastructure/api/product/dto/update-product.dto';
import {ProductResponseDto} from '@infrastructure/api/product/dto';

@Injectable({providedIn: 'root'})
export class ProductService {
  private readonly _api = inject(ProductApiService);
  private readonly _imageApi = inject(ProductImageApiService);
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

  fetchAll(): Observable<ProductPreview[] | null> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');


    return this._api.getProducts(shop.id).pipe(
      map(dto => ProductMapper.toPreviewArray(dto)),
      tap(products => this._products.set(products)),
    );
  }

  getById(id: string): Observable<ProductFull | null> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._api.getById(id, shop.id).pipe(
      map((dto) => ProductMapper.toFull(dto)),
    )
  }

  getUploadUrl(productId: string, params: { ext: string, contentType: string }[]): Observable<any> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._imageApi.getPresignedUrl(shop.id, productId, params);
  }

  update(productId: string, dto: ProductUpdateDto): Observable<ProductResponseDto> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._api.update(shop.id, productId, dto);
  }

}
