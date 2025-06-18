import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { ProductCategoryApiService } from '@infrastructure/api';
import { IdNameModel } from '@domain/models';
import { SessionService } from '@application/services';
import { ProductCategoryModel } from '@domain/models/product-category.model';
import { ProductCategorySyncDto } from '@infrastructure/api/product-category/dto/product-category-sync.dto';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {
  private readonly _api = inject(ProductCategoryApiService);
  private readonly _productCategories = signal<IdNameModel[]>([]);
  private readonly _productCategoriesWithProdCount = signal<ProductCategoryModel[]>([]);
  private readonly _session = inject(SessionService);

  constructor() {
    effect(() => {
      this.fetchCategories();
    });
  }

  public get categories(): Signal<IdNameModel[]> {
    return this._productCategories.asReadonly();
  }

  public get productCategoriesWithProdCount(): Signal<ProductCategoryModel[]> {
    return this._productCategoriesWithProdCount.asReadonly();
  }

  public fetchCategoriesWithProdCount(): void {
    const shop = this._session.activeShop();
    if (!shop) return;

    this._api
      .listWithProdCount(shop.id)
      .subscribe((categories) => this._productCategoriesWithProdCount.set(categories));
  }

  public sync(data: ProductCategorySyncDto): Observable<IdNameModel[] | null> {
    const shop = this._session.activeShop();
    if (!shop) return of(null);

    return this._api
      .sync(data, shop.id)
      .pipe(tap((categories) => this._productCategories.set(categories)));
  }

  private fetchCategories(): void {
    const shop = this._session.activeShop();
    if (!shop) return;

    this._api.list(shop.id).subscribe((categories) => this._productCategories.set(categories));
  }
}
