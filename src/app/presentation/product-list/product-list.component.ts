import {Component, computed, DestroyRef, inject, OnInit, Signal, signal} from '@angular/core';
import {ProductCategoryService, ProductService} from '@application/services';
import {ProductRowComponent} from '@presentation/ui-elements/product-row/product-row.component';
import {ProductAddModalComponent} from '@presentation/modals/product-add-modal/product-add-modal.component';
import {TooltipDirective} from '@shared/directives';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {FilerComponentSettings, FiltersComponent} from '@presentation/ui-elements/filters/filters.component';
import {ProductFilterFormHelperService} from '@shared/helpers/product-filter-form-helper.service';
import {auditTime, debounceTime, distinctUntilChanged, merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {getProductFilterSettings} from '@presentation/product-list/settings/get-product-filter-settings';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [
    ProductRowComponent,
    ProductAddModalComponent,
    TooltipDirective,
    FormsModule,
    FiltersComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductFilterFormHelperService],
})
export class ProductListComponent implements OnInit {
  readonly isDialogOpen = signal(false);
  private _destroyRef = inject(DestroyRef);
  private _filterFormHelper = inject(ProductFilterFormHelperService);
  filterForm: FormGroup = this._filterFormHelper.createForm();
  private readonly _productService = inject(ProductService);
  readonly products = this._productService.products;
  private categoryService = inject(ProductCategoryService);
  categories = this.categoryService.categories;
  filterSettings: Signal<FilerComponentSettings[]> = computed(() => getProductFilterSettings(this.categories()));

  ngOnInit(): void {
    this.subscribeOnFilterChanged();
  }

  openAddModal(): void {
    this.isDialogOpen.set(true);
  }

  clearFilters() {
    this._filterFormHelper.clear()
  }

  private subscribeOnFilterChanged(): void {
    merge(
      (this.filterForm.get('categoryId') as FormControl).valueChanges,
      (this.filterForm.get('isActive') as FormControl).valueChanges,
      (this.filterForm.get('search') as FormControl).valueChanges.pipe(debounceTime(500)),
      (this.filterForm.get('priceFrom') as FormControl).valueChanges.pipe(debounceTime(500)),
      (this.filterForm.get('priceTo') as FormControl).valueChanges.pipe(debounceTime(500)),
      // (this.filterForm.get('sortBy') as FormControl).valueChanges,
    ).pipe(takeUntilDestroyed(this._destroyRef), distinctUntilChanged(), auditTime(0)).subscribe(() => {
      const params = this._filterFormHelper.getFilterParams();
      this._productService.fetchAll(params).subscribe();
    });
  }
}
