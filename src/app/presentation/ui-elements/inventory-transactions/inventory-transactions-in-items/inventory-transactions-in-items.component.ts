import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';
import {InItemType} from '@shared/types/inventory-transactions-modal.types';
import {FormGroup, FormsModule} from '@angular/forms';
import {GridComponent} from '@presentation/ui-kit/grid/grid.component';
import {LucideAngularModule} from 'lucide-angular';
import {SelectComponent} from '@presentation/ui-kit/select/select.component';

@Component({
  standalone: true,
  selector: 'app-inventory-in-items',
  templateUrl: './inventory-transactions-in-items.component.html',
  styleUrls: ['./inventory-transactions-in-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    GridComponent,
    LucideAngularModule,
    SelectComponent
  ]
})
export class InventoryTransactionsInItems {
  items = input.required<InItemType[]>();
  form = input.required<FormGroup>();

  itemAdded = output<InItemType>();
  itemRemoved = output<number>();

  products = signal([]);

  onAddItemClick(): void {
    if (this.form().invalid) {
      return;
    }

    const data = this.form().value;

    this.itemAdded.emit({
      productId: data.product.id,
      productName: data.product.name,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
      totalPrice: data.unitPrice * data.quantity,
    })
  }
}
