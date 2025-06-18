import { Component, computed, DestroyRef, inject, OnInit, Signal, signal } from '@angular/core';
import { ProductCategoryService, ProductService } from '@application/services';
import { ProductRowComponent } from '@presentation/ui-elements/product-row/product-row.component';
import { ProductAddModalComponent } from '@presentation/modals/product-add-modal/product-add-modal.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import {
  FilerComponentSettings,
  FiltersComponent,
} from '@presentation/ui-elements/filters/filters.component';
import { ProductFilterFormHelperService } from '@shared/helpers/product-filter-form-helper.service';
import { auditTime, debounceTime, distinctUntilChanged, merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getProductFilterSettings } from '@presentation/product-list/settings/get-product-filter-settings';
import { InfiniteScrollDirective } from '@shared/directives/infinite-scroll/infinite-scroll.directive';
import { ProductCategoriesModalComponent } from '@presentation/modals/product-categories-modal/product-categories-modal.component';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [
    ProductRowComponent,
    ProductAddModalComponent,
    FormsModule,
    FiltersComponent,
    InfiniteScrollDirective,
    ProductCategoriesModalComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductFilterFormHelperService],
})
export class ProductListComponent implements OnInit {
  readonly isAddDialogOpen = signal(false);
  readonly isCategoriesDialogOpen = signal(false);

  readonly isLoading = signal(false);
  private _destroyRef = inject(DestroyRef);
  private _filterFormHelper = inject(ProductFilterFormHelperService);
  filterForm: FormGroup = this._filterFormHelper.createForm();
  private readonly _productService = inject(ProductService);
  readonly products = this._productService.products;
  total = this._productService.total;
  private categoryService = inject(ProductCategoryService);
  categories = this.categoryService.categories;
  filterSettings: Signal<FilerComponentSettings[]> = computed(() =>
    getProductFilterSettings(this.categories()),
  );
  private readonly pageSize = 20;
  private page = 1;

  ngOnInit(): void {
    this.loadProducts();
    this.subscribeOnFilterChanged();
  }

  onScrollChanged(): void {
    if (this.isLoading() || this.products()?.length === this._productService.total()) return;
    this.isLoading.set(true);

    this.page++;
    this.loadMore();
  }

  clearFilters() {
    this._filterFormHelper.clear();
  }

  private subscribeOnFilterChanged(): void {
    merge(
      (this.filterForm.get('categoryId') as FormControl).valueChanges,
      (this.filterForm.get('isActive') as FormControl).valueChanges,
      (this.filterForm.get('search') as FormControl).valueChanges.pipe(debounceTime(500)),
      (this.filterForm.get('priceFrom') as FormControl).valueChanges.pipe(debounceTime(500)),
      (this.filterForm.get('priceTo') as FormControl).valueChanges.pipe(debounceTime(500)),
      (this.filterForm.get('sortBy') as FormControl).valueChanges,
    )
      .pipe(takeUntilDestroyed(this._destroyRef), distinctUntilChanged(), auditTime(0))
      .subscribe(() => {
        this.loadProducts();
      });
  }

  private loadProducts(): void {
    const params = this._filterFormHelper.getFilterParams();
    this._productService.fetchTotal(params).subscribe();

    params.page = this.page;
    params.pageSize = this.pageSize;

    this._productService.fetchAll(params).subscribe(() => {
      this.isLoading.set(false);
    });
  }

  private loadMore(): void {
    const params = this._filterFormHelper.getFilterParams();
    params.page = this.page;
    params.pageSize = this.pageSize;

    this._productService.loadMore(params).subscribe(() => {
      this.isLoading.set(false);
    });
  }
}
