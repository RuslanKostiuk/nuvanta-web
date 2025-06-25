import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output, signal} from '@angular/core';
import {InItemType} from '@shared/types/inventory-transactions-modal.types';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GridComponent} from '@presentation/ui-kit/grid/grid.component';
import {LucideAngularModule} from 'lucide-angular';
import {SelectComponent} from '@presentation/ui-kit/select/select.component';
import {ProductService} from '@application/services';
import {debounceTime, distinctUntilChanged, filter, Subject, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProductSearch} from '@domain/models/product-search.model';
import {NumberUtils} from '@shared/utils/number.utils';

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
    SelectComponent,
    ReactiveFormsModule
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
    this.form().reset();

    this.itemAdded.emit({
      productId: data.product.productId,
      productName: data.product.fullName,
      quantity: data.quantity,
      unitPrice: NumberUtils.toPrice(data.unitPrice),
      totalPrice: NumberUtils.toPrice(data.unitPrice * data.quantity),
    });
  }

  private subscribeOnTypehead(): void {
    this.productTypehead$.pipe(
      takeUntilDestroyed(this._destroyRef),
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => {
        const hasTerm = Boolean(term && term.length > 1);
        if (!hasTerm) this.products.set([]);
        return hasTerm;
      }),
      switchMap((term) => this._productService.search(term))
    )
      .subscribe((result) => {
        this.products.set(result);
      });
  }
}
