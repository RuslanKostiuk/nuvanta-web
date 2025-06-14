import {Component, inject, OnInit, signal} from '@angular/core';
import {InvoiceService} from '@application/services';
import {LucideAngularModule} from 'lucide-angular';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {GridComponent} from '@presentation/ui-elements/grid/grid.component';
import {GridSettings} from '@shared/types/grid.types';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  standalone: true,
  imports: [LucideAngularModule, NgxDaterangepickerMd, GridComponent]
})
export class InvoiceListComponent implements OnInit {
  settings: GridSettings[] = [
    {
      label: 'Date',
      bindProperty: 'operationDate',
      sortable: true,
      filterable: true,
      filterType: 'date',
      styles: {'max-width': '100px'}
    },
    {
      label: 'Type',
      bindProperty: 'type',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [{label: 'All', value: null}, {label: 'IN', value: 'IN'}, {label: 'OUT', value: 'OUT'}]
    },
    {label: 'Subtype', bindProperty: 'subtype', sortable: true, filterable: true, filterType: 'text'},
    {
      label: 'Products',
      bindProperty: 'productCount',
      sortable: true,
      filterable: true,
      filterType: 'number',
      styles: {'max-width': '50px'}
    },
    {
      label: 'Quantity',
      bindProperty: 'totalQuantity',
      sortable: true,
      filterable: true,
      filterType: 'number',
      styles: {'max-width': '50px'}
    },
    {
      label: 'Total',
      bindProperty: 'totalValue',
      sortable: true,
      filterable: true,
      filterType: 'number',
      styles: {'max-width': '70px'}
    },
    {
      label: 'Note',
      bindProperty: 'note',
      filterable: true,
      filterType: 'text',
      styles: {'max-width': '200px'}
    },
  ]
  total = signal(28);
  private _invoiceService = inject(InvoiceService);
  invoices = this._invoiceService.invoices;
  private readonly _limit = 20;
  private _offset = 0;

  ngOnInit(): void {
    this.loadInvoices();
  }

  onSortChanged(params: Record<string, 'asc' | 'desc' | null>): void {
    console.log('sort:', params);
  }

  onFilterChanged(params: Record<string, any>): void {
    console.log('filter:', params);
  }

  onResetFilter(): void {
    console.log('reset:');
  }

  onScrollEnd(): void {
    this.loadInvoices();
  }

  openAddModal(): void {

  }

  openEditModal(invoiceId: string): void {

  }

  private loadInvoices(): void {
    this._invoiceService.loadInvoices({limit: this._limit, offset: this._offset}).subscribe(() => {
      this._offset += this._limit;
    });
  }
}
