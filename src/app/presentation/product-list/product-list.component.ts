import {Component, inject} from '@angular/core';
import {ProductService} from '@application/services';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private readonly _productService = inject(ProductService);

  readonly products = this._productService.products;
}
