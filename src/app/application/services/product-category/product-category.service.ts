import {effect, inject, Injectable, Signal, signal} from '@angular/core';
import {ProductCategoryApiService} from '@infrastructure/api';
import {IdNameModel} from '@domain/models';
import {SessionService} from '@application/services';

@Injectable({providedIn: 'root'})
export class ProductCategoryService {
  private readonly _api = inject(ProductCategoryApiService);
  private readonly _productCategories = signal<IdNameModel[]>([]);
  private readonly _session = inject(SessionService);

  constructor() {
    effect(() => {
      this.fetchCategories()
    });
  }

  public get categories(): Signal<IdNameModel[]> {
    return this._productCategories;
  }

  private fetchCategories(): void {
    const shop = this._session.activeShop();
    if (!shop) return;

    this._api.list(shop.id).subscribe((categories) => this._productCategories.set(categories));
  }
}
