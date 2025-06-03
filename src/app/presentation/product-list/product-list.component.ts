import {Component, inject, signal} from '@angular/core';
import {ProductService} from '@application/services';
import {ProductRowComponent} from '@presentation/ui-elements/product-row/product-row.component';
import {ProductAddModalComponent} from '@presentation/modals/product-add-modal/product-add-modal.component';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [
    ProductRowComponent,
    ProductAddModalComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  readonly isDialogOpen = signal(false);
  private readonly _productService = inject(ProductService);
  readonly products = this._productService.products;

  openAddModal(): void {
    this.isDialogOpen.set(true);
  }
}
