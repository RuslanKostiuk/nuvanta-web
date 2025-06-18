import { Component, inject, input, Input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductCategoryService } from '@application/services';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  imports: [ReactiveFormsModule],
  styleUrl: './product-main.component.scss',
})
export class ProductMainComponent {
  @Input({ required: true }) formGroup!: FormGroup;

  stock = input<number>();

  public readonly showTip = signal(false);
  private readonly _productCategoryService = inject(ProductCategoryService);
  public readonly categories = this._productCategoryService.categories;
}
