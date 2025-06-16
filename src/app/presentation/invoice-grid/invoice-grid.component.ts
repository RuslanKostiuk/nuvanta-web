import {Component, inject, OnInit} from '@angular/core';
import {InvoiceService} from '@application/services';
import {LucideAngularModule} from 'lucide-angular';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {GridComponent} from '@presentation/ui-elements/grid/grid.component';
import {INVOICE_GRID_SETTINGS} from '@presentation/invoice-grid/grid-settings/invoice-grid-settings';
import {InvoiceListFilterParams} from '@infrastructure/api/invoice/dto/invoice-list-query-params.dto';
import {SortParams} from '@shared/types/sort-params.type';
import {SortMapper} from '@infrastructure/mappers';
import {InvoiceMapper} from '@infrastructure/mappers/invoice/invoice.mapper';

@Component({
  selector: 'app-invoice-grid',
  templateUrl: './invoice-grid.component.html',
  styleUrls: ['./invoice-grid.component.scss'],
  standalone: true,
  imports: [LucideAngularModule, NgxDaterangepickerMd, GridComponent]
})
export class InvoiceGridComponent implements OnInit {
  settings = INVOICE_GRID_SETTINGS;
  private _invoiceService = inject(InvoiceService);
  total = this._invoiceService.total;
  invoices = this._invoiceService.invoices;
  private readonly _limit = 50;
  private _offset = 0;

  private _filter: InvoiceListFilterParams = {};
  private _sort: SortParams = {};

  ngOnInit(): void {
    this.loadTotal();
    this.loadInvoices();
  }

  onSortChanged(params: Record<string, 'asc' | 'desc' | null>): void {
    this._offset = 0;
    this._sort = SortMapper.map(params);
    this._invoiceService.clearInvoices();
    this.loadInvoices();
  }

  onFilterChanged(params: Record<string, any>): void {
    this._offset = 0;
    this._filter = InvoiceMapper.mapFilters(params);
    this._invoiceService.clearInvoices();
    this.loadInvoices();
    this.loadTotal();
  }

  onResetFilter(): void {
    this._offset = 0;
    this._sort = {};
    this._filter = {};
    this.loadInvoices();
    this.loadTotal();
  }

  onScrollEnd(): void {
    this.loadInvoices();
  }

  openAddModal(): void {

  }

  openEditModal(invoiceId: string): void {

  }

  private loadInvoices(): void {
    this._invoiceService.loadInvoices({
      limit: this._limit,
      offset: this._offset,
      ...this._sort,
      ...this._filter
    }).subscribe(() => {
      this._offset += this._limit;
    });
  }

  private loadTotal(): void {
    this._invoiceService.loadTotal(this._filter).subscribe()
  }
}
