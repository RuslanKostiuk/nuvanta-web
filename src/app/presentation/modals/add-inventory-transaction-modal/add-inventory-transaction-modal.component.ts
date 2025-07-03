import {ChangeDetectionStrategy, Component, inject, OnDestroy, output, signal, WritableSignal} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalComponent} from '@presentation/modals/modal/modal.component';
import {LucideAngularModule} from 'lucide-angular';
import {InventoryTransactionFormHelperService} from '@shared/helpers/inventory-transaction-form-helper.service';
import {InventoryTransactionService} from '@application/services';
import {InItemType, InventoryTransaction, OutItemType} from '@shared/types/inventory-transactions-modal.types';
import {
  InventoryTransactionsMainComponent
} from '@presentation/ui-elements/inventory-transactions/inventory-transactions-main/inventory-transactions-main.component';
import {
  InventoryTransactionsInItems
} from '@presentation/ui-elements/inventory-transactions/inventory-transactions-in-items/inventory-transactions-in-items.component';
import {
  InventoryTransactionsOutItems
} from '@presentation/ui-elements/inventory-transactions/inventory-transactions-out-items/inventory-transactions-out-items.component';

@Component({
  standalone: true,
  selector: 'app-add-inventory-modal',
  templateUrl: './add-inventory-transaction-modal.component.html',
  styleUrls: ['./add-inventory-transaction-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InventoryTransactionFormHelperService],
  imports: [
    ModalComponent,
    ReactiveFormsModule,
    LucideAngularModule,
    InventoryTransactionsMainComponent,
    InventoryTransactionsInItems,
    InventoryTransactionsOutItems
  ]
})
export class AddInventoryTransactionModalComponent implements OnDestroy {
  readonly _service = inject(InventoryTransactionService);

  readonly close = output();
  save = output()
  items = signal<(InItemType | OutItemType)[]>([]);
  private _helper = inject(InventoryTransactionFormHelperService);
  form = this._helper.createForm();
  itemForm = this._helper.createItemInForm();

  get asInItems(): WritableSignal<InItemType[]> {
    return this.items as WritableSignal<InItemType[]>;
  }

  get asOutItems(): WritableSignal<OutItemType[]> {
    return this.items as WritableSignal<OutItemType[]>;
  }

  onTypeChanged(type: 'IN' | 'OUT'): void {
    this.itemForm = type === 'IN' ? this._helper.createItemInForm() : this._helper.createItemOutForm();
    this.items.set([]);
  }

  addItem(item: InItemType | OutItemType) {
    this.items.update((items) => {
      const updateItemIndex = items.findIndex((x) => x.productId === item.productId);
      if (updateItemIndex === -1) {
        return [...items, item];
      }

      return items.map((x, index) => updateItemIndex === index ? item : x);
    });
  }

  editItem(id: string) {
    const type = this.form.get('type')?.value;
    const currentItem = this.items().find((x) => x.productId === id);

    if (!currentItem) {
      return;
    }

    if (type === 'IN') {
      this._helper.setInItems(currentItem as InItemType);
    }

    if (type === 'OUT') {
      this._helper.setOutItems(currentItem as OutItemType);
    }
  }

  removeItem(id: string): void {
    this.items.update((items) => items.filter((x) => x.productId !== id));
  }

  onSubmit(): void {
    if (this.form.invalid || !this.items().length) {
      this.form.markAllAsTouched();
      return;
    }

    const params: InventoryTransaction = {
      ...this.form.value,
      items: this.items(),
    };

    this._service.create(params).subscribe(() => {
      this.save.emit();
    });
  }

  ngOnDestroy(): void {
    this._helper.destroy();
  }
}

