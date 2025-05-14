import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';
import {ProductPreview} from '@domain/models';
import {ProductEditModalComponent} from '@presentation/modals/product-edit-modal/product-edit-modal.component';

@Component({
  selector: 'app-product-row',
  imports: [
    ProductEditModalComponent
  ],
  templateUrl: './product-row.component.html',
  styleUrl: './product-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRowComponent {
  readonly product = input.required<ProductPreview>();
  readonly update = output<ProductPreview>();

  isDialogOpen = signal(false);


  onEdit() {
    this.isDialogOpen.set(true);
  }

  onSave(updated: ProductPreview) {
    this.update.emit(updated);
    this.isDialogOpen.set(false);
  }
}
