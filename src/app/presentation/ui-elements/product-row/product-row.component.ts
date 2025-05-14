import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';
import {Product} from '@domain/models';
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
  readonly product = input.required<Product>();
  readonly update = output<Product>();

  isDialogOpen = signal(false);


  onEdit() {
    this.isDialogOpen.set(true);
  }

  onSave(updated: Product) {
    this.update.emit(updated);
    this.isDialogOpen.set(false);
  }
}
