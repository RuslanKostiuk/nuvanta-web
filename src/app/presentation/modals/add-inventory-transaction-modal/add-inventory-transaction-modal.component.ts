import {ChangeDetectionStrategy, Component, inject, output, signal, WritableSignal} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalComponent} from '@presentation/modals/modal/modal.component';
import {LucideAngularModule} from 'lucide-angular';
import {InventoryTransactionFormHelperService} from '@shared/helpers/inventory-transaction-form-helper.service';
import {InventoryTransactionService} from '@application/services';
import {InventoryTransactionSubtype} from '@domain/models/inventory-transaction-subtype.model';
import {InItemType, OutItemType} from '@shared/types/inventory-transactions-modal.types';
import {
  InventoryTransactionsMainComponent
} from '@presentation/ui-elements/inventory-transactions/inventory-transactions-main/inventory-transactions-main.component';
import {
  InventoryTransactionsInItems
} from '@presentation/ui-elements/inventory-transactions/inventory-transactions-in-items/inventory-transactions-in-items.component';

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
    InventoryTransactionsInItems
  ]
})
export class AddInventoryTransactionModalComponent {
  readonly _service = inject(InventoryTransactionService);

  readonly close = output();
  save = output()
  items = signal<InItemType[] | OutItemType[]>([]);
  subtypes = signal<InventoryTransactionSubtype[]>([]);
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

  }

  removeItem(index: number) {
  }

  onSubmit(): void {
  }


}

