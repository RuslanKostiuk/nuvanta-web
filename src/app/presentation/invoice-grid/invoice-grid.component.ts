import {Component, inject, OnInit} from '@angular/core';
import {InvoiceService} from '@application/services';
import {LucideAngularModule} from 'lucide-angular';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {GridComponent} from '@presentation/ui-elements/grid/grid.component';
import {INVOICE_GRID_SETTINGS} from '@presentation/invoice-grid/grid-settings/invoice-grid-settings';

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

  ngOnInit(): void {
    this.loadTotal();
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

  private loadTotal(): void {
    this._invoiceService.loadTotal().subscribe()
  }
}
