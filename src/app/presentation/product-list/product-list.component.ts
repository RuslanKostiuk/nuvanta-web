import {Component, computed, effect, inject, signal} from '@angular/core';
import {ProductCategoryService, ProductService} from '@application/services';
import {ProductRowComponent} from '@presentation/ui-elements/product-row/product-row.component';
import {ProductAddModalComponent} from '@presentation/modals/product-add-modal/product-add-modal.component';
import {TooltipDirective} from '@shared/directives';
import {FormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [
    ProductRowComponent,
    ProductAddModalComponent,
    TooltipDirective,
    FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  readonly isDialogOpen = signal(false);
  filters = signal<Record<string, any>>({
    categoryId: null,
    isActive: null,
    search: null,
    priceFrom: null,
    priceTo: null,
    sortBy: null,
  });
  productFilterParams = computed(() => {
    const f = this.filters();
    const params: Record<string, any> = {};

    if (f.categoryId != null) params['categoryId'] = f.categoryId;
    if (f.isActive !== null) params['isActive'] = f.isActive;
    if (f.search !== null) params['sku'] = f.search;
    if (f.priceFrom != null) params['priceFrom'] = f.priceFrom;
    if (f.priceTo != null) params['priceTo'] = f.priceTo;
    // if (f.sortBy) params.sort = f.sort;

    return params;
  });
  private readonly _productService = inject(ProductService);
  readonly products = this._productService.products;
  private categoryService = inject(ProductCategoryService);
  categories = this.categoryService.categories;

  constructor() {
    effect(() => {
      const params = this.productFilterParams();
      this._productService.fetchAll(params).subscribe()
    });
  }

  get categoryId(): string {
    return this.filters().categoryId;
  }

  set categoryId(categoryId: string) {
    this.filters.update((f) => ({...f, categoryId}))
  }

  get isActive(): boolean {
    return this.filters().isActive;
  }

  set isActive(isActive: boolean) {
    this.filters.update((f) => ({...f, isActive}))
  }

  get search(): string {
    return this.filters().search;
  }

  set search(search: string) {
    this.filters.update((f) => ({...f, search}))
  }

  get priceFrom(): number {
    return this.filters().priceFrom;
  }

  set priceFrom(priceFrom: number) {
    this.filters.update((f) => ({...f, priceFrom}))
  }

  get priceTo(): number {
    return this.filters().priceTo;
  }

  set priceTo(priceTo: number) {
    this.filters.update((f) => ({...f, priceTo}))
  }


  openAddModal(): void {
    this.isDialogOpen.set(true);
  }

  clearFilters() {
    this.filters.set({
      categoryId: null,
      isActive: null,
      search: null,
      priceFrom: null,
      priceTo: null,
      sortBy: null,
    });
  }
}
