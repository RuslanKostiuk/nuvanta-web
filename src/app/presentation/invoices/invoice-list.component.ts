import {Component, inject, OnInit} from '@angular/core';
import {InvoiceService} from '@application/services';
import {LucideAngularModule} from 'lucide-angular';
import {DatePipe, DecimalPipe} from '@angular/common';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  standalone: true,
  imports: [LucideAngularModule, DecimalPipe, DatePipe, NgxDaterangepickerMd]
})
export class InvoiceListComponent implements OnInit {
  private _invoiceService = inject(InvoiceService);

  invoices = this._invoiceService.invoices;

  ngOnInit(): void {
    this._invoiceService.loadInvoices().subscribe();
  }

  openAddModal(): void {

  }

  openEditModal(invoiceId: string): void {

  }

}
