import {inject, Injectable, signal} from '@angular/core';
import {map, Observable, of, tap} from 'rxjs';
import {ProductApiService} from '@infrastructure/api/product/product-api.service';
import {ProductMapper} from '@infrastructure/mappers';
import {SessionService} from '@application/services';
import {ProductPreview} from '@domain/models/product-preview.model';
import {ProductFull} from '@domain/models';
import {ProductImageApiService} from '@infrastructure/api/product-image/product-image-api.service';
import {ProductMutateDto} from '@infrastructure/api/product/dto/update-product.dto';
import {ProductResponseDto} from '@infrastructure/api/product/dto';
import {GetUploadUrlDto} from '@infrastructure/api/product-image/dto';
import {UploadUrlResponse} from '@infrastructure/api/product-image/dto/upload-url.response';

@Injectable({providedIn: 'root'})
export class ProductService {
  private readonly _api = inject(ProductApiService);
  private readonly _imageApi = inject(ProductImageApiService);
  private readonly _session = inject(SessionService);
  private readonly _products = signal<ProductPreview[] | null>(null);
  readonly products = this._products.asReadonly();
  private readonly _total = signal<number>(0);
  readonly total = this._total.asReadonly();

  fetchAll(params?: Record<string, any>): Observable<ProductPreview[] | null> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');


    return this._api.getProducts(shop.id, params).pipe(
      map(dto => ProductMapper.toPreviewArray(dto)),
      tap(products => this._products.set(products)),
    );
  }

  fetchTotal(params?: Record<string, any>): Observable<number> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._api.getTotal(shop.id, params).pipe(tap((total) => this._total.set(total)));
  }

  loadMore(params?: Record<string, any>): Observable<ProductPreview[] | null> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');


    return this._api.getProducts(shop.id, params).pipe(
      map(dto => ProductMapper.toPreviewArray(dto)),
      tap(products => this._products.update((existing) => {
        const result = existing ?? [];
        return result.concat(products);
      })),
    );
  }

  getById(id: string): Observable<ProductFull | null> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._api.getById(id, shop.id).pipe(
      map((dto) => ProductMapper.toFull(dto)),
    )
  }

  update(productId: string, dto: ProductMutateDto): Observable<ProductResponseDto> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._api.update(shop.id, productId, dto).pipe((tap((p) => {
      this._products.update((products) => {
        if (!products?.length) {
          return null;
        }

        const replaceIndex = products.findIndex((x) => x.id === p.id);
        products[replaceIndex] = ProductMapper.toPreview(p);
        return products;
      });
    })));
  }

  create(productId: string, dto: ProductMutateDto): Observable<ProductResponseDto> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    return this._api.create(shop.id, productId, dto).pipe((tap((p) => {
      this._products.update((products) => {
        if (!products?.length) {
          return null;
        }

        products.unshift(ProductMapper.toPreview(p));
        return products;
      });
    })));
  }

  getUploadUrl(productId: string, params: GetUploadUrlDto[]): Observable<UploadUrlResponse[] | null> {
    const shop = this._session.activeShop();
    if (!shop) throw new Error('Shop not found');

    if (!params.length) {
      return of(null);
    }

    return this._imageApi.getPresignedUrl(shop.id, productId, params);
  }

  async uploadImages(params: { file: File, uploadUrl?: string }[]): Promise<void> {
    try {
      await Promise.all(params.map(({file, uploadUrl}) => this._imageApi.uploadFiles(file, uploadUrl)));
    } catch (error) {
      console.error(error);
    }
  }

}
