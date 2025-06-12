import {Component, inject, OnInit} from '@angular/core';
import {InvoiceService} from '@application/services';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  standalone: true,
  imports: []
})
export class InvoiceListComponent implements OnInit {
  private _invoiceService = inject(InvoiceService);

  ngOnInit(): void {
    this._invoiceService.loadInvoices().subscribe();
  }

}
