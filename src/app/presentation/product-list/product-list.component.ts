import {Component, inject, signal} from '@angular/core';
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
  filters = {
    categoryId: '',
    isActive: '',
    search: '',
    priceFrom: '',
    priceTo: '',
    sortBy: '',
  };
  private readonly _productService = inject(ProductService);
  readonly products = this._productService.products;
  private categoryService = inject(ProductCategoryService);
  categories = this.categoryService.categories;

  openAddModal(): void {
    this.isDialogOpen.set(true);
  }

  clearFilters() {
    this.filters = {
      categoryId: '',
      isActive: '',
      search: '',
      priceFrom: '',
      priceTo: '',
      sortBy: '',
    };
  }
}
