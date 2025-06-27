import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal
} from '@angular/core';
import {InItemType} from '@shared/types/inventory-transactions-modal.types';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GridComponent} from '@presentation/ui-kit/grid/grid.component';
import {LucideAngularModule} from 'lucide-angular';
import {SelectComponent} from '@presentation/ui-kit/select/select.component';
import {ProductService} from '@application/services';
import {debounceTime, distinctUntilChanged, filter, Subject, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProductSearch} from '@domain/models/product-search.model';
import {GridActionClickEvent, GridSettings} from '@shared/types/grid.types';
import {NumberUtils} from '@shared/utils/number.utils';

const SETTINGS: GridSettings[] = [
  {label: 'Product', bindProperty: 'productName', styles: {'min-width': '290px', 'max-width': '380px'}},
  {label: 'Quantity', bindProperty: 'quantity', styles: {'min-width': '140px'}},
  {
    label: 'Unit Price',
    bindProperty: 'unitPrice',
    styles: {'min-width': '140px'},
    formatter: (rowItem) => NumberUtils.toPrice(rowItem.unitPrice)
  },
  {
    label: 'Total Price',
    bindProperty: 'totalPrice',
    styles: {'min-width': '140px'},
    formatter: (rowItem) => NumberUtils.toPrice(rowItem.totalPrice)
  }
]

@Component({
  standalone: true,
  selector: 'app-inventory-in-items',
  templateUrl: './inventory-transactions-in-items.component.html',
  styleUrls: ['./inventory-transactions-in-items.component.scss', '../inventory-transaction-common.scss'],
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

  settings = SETTINGS;

  itemAdd = output<InItemType>();
  itemRemove = output<string>();
  products = signal<ProductSearch[]>([]);
  productTypehead$ = new Subject<string>();
  total = computed(() => NumberUtils.toPrice(this.items().reduce((acc, item) => acc + item.totalPrice, 0)));
  private _productService = inject(ProductService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.subscribeOnTypehead();
  }

  onAddItemClick(): void {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    const data = this.form().value;
    this.form().reset({quantity: 1});

    this.itemAdd.emit({
      productId: data.product.productId,
      productName: data.product.fullName,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
      totalPrice: data.unitPrice * data.quantity,
    });
  }

  onActionClick(event: GridActionClickEvent): void {
    if (event.action === 'delete') {
      this.itemRemove.emit(event.item.productId);
    }
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
      .subscribe((products) => {
        const selectedProductIds = this.items().map((x) => x.productId);
        const filteredProducts = products.filter((product) => !selectedProductIds.includes(product.productId));
        this.products.set(filteredProducts);
      });
  }
}
