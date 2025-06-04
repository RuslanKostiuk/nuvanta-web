import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import {ProductPreview} from '@domain/models';
import {ProductEditModalComponent} from '@presentation/modals/product-edit-modal/product-edit-modal.component';
import {ProductCategoryService} from '@application/services';
import {GetByIdPipe} from '@shared/pipes';

@Component({
  selector: 'app-product-row',
  imports: [
    ProductEditModalComponent,
    GetByIdPipe,
  ],
  templateUrl: './product-row.component.html',
  styleUrl: './product-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRowComponent {
  readonly product = input.required<ProductPreview>();
  isDialogOpen = signal(false);
  private categoryService = inject(ProductCategoryService);
  categories = this.categoryService.categories;

  onEdit() {
    this.isDialogOpen.set(true);
  }
}
