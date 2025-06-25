import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output, signal} from '@angular/core';
import {InItemType} from '@shared/types/inventory-transactions-modal.types';
import {FormGroup, FormsModule} from '@angular/forms';
import {GridComponent} from '@presentation/ui-kit/grid/grid.component';
import {LucideAngularModule} from 'lucide-angular';
import {SelectComponent} from '@presentation/ui-kit/select/select.component';
import {ProductService} from '@application/services';
import {debounceTime, distinctUntilChanged, filter, Subject, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProductSearch} from '@domain/models/product-search.model';

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
export class InventoryTransactionsInItems implements OnInit {
  items = input.required<InItemType[]>();
  form = input.required<FormGroup>();

  itemAdded = output<InItemType>();
  itemRemoved = output<number>();
  products = signal<ProductSearch[]>([]);
  productTypehead$ = new Subject<string>();
  private _productService = inject(ProductService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.subscribeOnTypehead();
  }

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

  private subscribeOnTypehead(): void {
    this.productTypehead$.pipe(
      takeUntilDestroyed(this._destroyRef),
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => Boolean(term && term.length > 1)),
      switchMap((term) => this._productService.search(term))
    )
      .subscribe((result) => {
        this.products.set(result);
      });
  }
}
