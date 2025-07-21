import {ChangeDetectionStrategy, Component, inject, input, OnInit, output, signal} from '@angular/core';
import {InventoryTransactionService} from '@application/services';
import {ModalComponent} from '@presentation/modals/modal/modal.component';
import {
  InventoryTransactionsMainComponent
} from '@presentation/ui-elements/inventory-transactions/inventory-transactions-main/inventory-transactions-main.component';
import {InventoryTransactionFormHelperService} from '@shared/helpers/inventory-transaction-form-helper.service';
import {GridComponent} from '@presentation/ui-kit/grid/grid.component';
import {InItemType, OutItemType} from '@shared/types/inventory-transactions-modal.types';
import {inventoryTransactionsInItemsGridSettings, inventoryTransactionsOutItemsGridSettings} from '@shared/settings';
import {GridSettings} from '@shared/types/grid.types';

@Component({
  standalone: true,
  selector: 'app-inventory-transaction-preview-modal',
  templateUrl: './inventory-transaction-preview-modal.component.html',
  styleUrls: ['./inventory-transaction-preview-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InventoryTransactionFormHelperService],
  imports: [
    ModalComponent,
    InventoryTransactionsMainComponent,
    GridComponent
  ]
})
export class InventoryTransactionPreviewModalComponent implements OnInit {
  readonly close = output();
  transactionId = input.required<string>();
  items = signal<(InItemType | OutItemType)[]>([]);
  settings = signal<GridSettings[]>([]);
  total = signal(0);
  private _service = inject(InventoryTransactionService);
  private _helper = inject(InventoryTransactionFormHelperService);
  form = this._helper.createForm();

  ngOnInit() {
    this._service.loadTransaction(this.transactionId()).subscribe((transaction) => {
      this._helper.setFormValues(transaction);
      this.items.set(transaction.items);
      const settings: GridSettings[] = transaction.type === 'IN' ? inventoryTransactionsInItemsGridSettings : inventoryTransactionsOutItemsGridSettings;
      this.settings.set(settings)
      this._helper.disableForm();
      this.total.set(transaction.totalCost as number);
    })
  }
}
