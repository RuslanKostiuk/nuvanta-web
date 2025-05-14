import {Component, inject} from '@angular/core';
import {ProductService} from '@application/services';
import {ProductRowComponent} from '@presentation/ui-elements/product-row/product-row.component';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductRowComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private readonly _productService = inject(ProductService);

  readonly products = this._productService.products;
}
