import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {InventoryTransactionService} from '@application/services';
import {LucideAngularModule} from 'lucide-angular';
import {GridComponent} from '@presentation/ui-kit/grid/grid.component';
import {
  InventoryTransactionGridSettings
} from '@presentation/inventory-transaction-grid/grid-settings/inventory-transaction-grid-settings';
import {
  InventoryTransactionListFilterParams
} from '@infrastructure/api/inventory-transaction/dto/inventory-transaction-list-query-params.dto';
import {SortParams} from '@shared/types/sort-params.type';
import {SortMapper} from '@infrastructure/mappers';
import {InventoryTransactionMapper} from '@infrastructure/mappers/inventory-transaction/inventory-transaction.mapper';
import {GridSettings} from '@shared/types/grid.types';
import {
  AddInventoryTransactionModalComponent
} from '@presentation/modals/add-inventory-transaction-modal/add-inventory-transaction-modal.component';

@Component({
  selector: 'app-inventory-transaction-grid',
  templateUrl: './inventory-transaction-grid.component.html',
  styleUrls: ['./inventory-transaction-grid.component.scss'],
  standalone: true,
  imports: [LucideAngularModule, GridComponent, AddInventoryTransactionModalComponent],
})
export class InventoryTransactionGridComponent implements OnInit {
  showAddModal = signal(false);
  settings: GridSettings[] = [];
  private _inventoryTransactionsService = inject(InventoryTransactionService);
  total = this._inventoryTransactionsService.total;
  inventoryTransactions = this._inventoryTransactionsService.inventoryTransactions;
  private readonly _limit = 50;
  private _offset = 0;

  private _filter: InventoryTransactionListFilterParams = {};
  private _sort: SortParams = {};

  constructor() {
    effect(() => {
      this.settings = InventoryTransactionGridSettings.getSettings({
        subtypes: this._inventoryTransactionsService.subtypes(),
      });
    });
  }

  ngOnInit(): void {
    this.loadTotal();
    this.loadInventoryTransactions();
  }

  onSortChanged(params: Record<string, 'asc' | 'desc' | null>): void {
    this._offset = 0;
    this._sort = SortMapper.map(params);
    this._inventoryTransactionsService.clearInventoryTransactions();
    this.loadInventoryTransactions();
  }

  onFilterChanged(params: Record<string, any>): void {
    this._offset = 0;
    this._filter = InventoryTransactionMapper.mapFilters(params);
    this._inventoryTransactionsService.clearInventoryTransactions();
    this.loadInventoryTransactions();
    this.loadTotal();
  }

  onResetFilter(): void {
    this._offset = 0;
    this._sort = {};
    this._filter = {};
    this.loadInventoryTransactions();
    this.loadTotal();
  }

  onScrollEnd(): void {
    this.loadInventoryTransactions();
  }

  openAddModal(): void {
    this.showAddModal.set(true);
  }

  openEditModal(inventoryTransactionId: string): void {
  }

  onSave(): void {
    this.showAddModal.set(false);
    this._offset = 0;
    this._inventoryTransactionsService.clearInventoryTransactions();
    this.loadInventoryTransactions();
    this.loadTotal();
  }

  private loadInventoryTransactions(): void {
    this._inventoryTransactionsService
      .loadInventoryTransactions({
        limit: this._limit,
        offset: this._offset,
        ...this._sort,
        ...this._filter,
      })
      .subscribe(() => {
        this._offset += this._limit;
      });
  }

  private loadTotal(): void {
    this._inventoryTransactionsService.loadTotal(this._filter).subscribe();
  }
}
