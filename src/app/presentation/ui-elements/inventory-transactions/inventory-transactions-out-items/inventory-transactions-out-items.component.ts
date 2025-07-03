import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal
} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SelectComponent} from '@presentation/ui-kit/select/select.component';
import {ProductSearch} from '@domain/models/product-search.model';
import {debounceTime, distinctUntilChanged, filter, Subject, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProductService} from '@application/services';
import {OutItemType} from '@shared/types/inventory-transactions-modal.types';
import {GridActionClickEvent, GridSettings} from '@shared/types/grid.types';
import {NumberUtils} from '@shared/utils/number.utils';
import {StringUtils} from '@shared/utils/string.utils';
import {GridComponent} from '@presentation/ui-kit/grid/grid.component';


const SETTINGS: GridSettings[] = [
  {
    label: 'Product',
    bindProperty: 'productName',
    styles: {'min-width': '230px', 'max-width': '380px', 'font-size': '13px'}
  },
  {label: 'Quantity', bindProperty: 'quantity', styles: {'min-width': '80px', 'font-size': '13px'}},
  {
    label: 'Discount',
    bindProperty: 'discount',
    styles: {'min-width': '80px', 'font-size': '13px'},
  },
  {
    label: 'Discount Type',
    bindProperty: 'discountType',
    styles: {'min-width': '110px', 'font-size': '13px'},
    formatter: (rowItem) => StringUtils.capitalize(rowItem.discountType),
  },
  {
    label: 'Selling Price',
    bindProperty: 'sellingPrice',
    styles: {'min-width': '140px', 'font-size': '13px'},
    formatter: (rowItem: OutItemType) => `${NumberUtils.toPrice(rowItem.sellingPrice)} - ${rowItem.discountValue}(${+NumberUtils.toPrice(rowItem.discountPercent)}%) = ${NumberUtils.toPrice(rowItem.finalPrice)}`,
  },
  {
    label: 'Total Selling Price',
    bindProperty: 'totalSellingFinalPrice',
    styles: {'min-width': '140px', 'font-size': '13px'},
    formatter: (rowItem: OutItemType) => `${NumberUtils.toPrice(rowItem.totalSellingPrice)} - ${rowItem.totalDiscount}(${+NumberUtils.toPrice(rowItem.discountPercent)}%) = ${NumberUtils.toPrice(rowItem.totalSellingFinalPrice)}`,
  },
]

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inventory-transactions-out-items',
  templateUrl: './inventory-transactions-out-items.component.html',
  styleUrls: ['./inventory-transactions-out-items.component.scss', '../inventory-transaction-common.scss'],
  imports: [
    LucideAngularModule,
    ReactiveFormsModule,
    SelectComponent,
    GridComponent,
  ]
})
export class InventoryTransactionsOutItems implements OnInit {
  itemAdd = output<OutItemType>();
  itemRemove = output<string>();
  itemEdit = output<string>();
  items = input.required<OutItemType[]>();
  form = input.required<FormGroup>();
  products = signal<ProductSearch[]>([]);
  productTypehead$ = new Subject<string>();
  settings = SETTINGS;
  total = computed(() => NumberUtils.toPrice(this.items().reduce((acc, item) => acc + parseFloat(item.totalSellingFinalPrice.toString()), 0)));
  private _destroyRef = inject(DestroyRef);
  private _productService = inject(ProductService);
  private _cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.subscribeOnTypehead();
    this.subscribeOnFormChanges();
  }

  onAddItemClick(): void {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    const data = this.form().getRawValue();
    this.form().reset({quantity: 1, discountType: 'fixed'});

    this.itemAdd.emit({
      productId: data.product.productId,
      productName: data.product.fullName,
      stock: data.product.stock,
      quantity: data.quantity,
      discount: data.discount,
      discountType: data.discountType,
      sellingPrice: data.price,
      totalSellingPrice: data.totalPrice,
      finalPrice: data.finalPrice,
      discountValue: data.discountValue,
      discountPercent: data.discountPercent,
      totalSellingFinalPrice: data.totalFinalPrice,
      totalDiscount: data.totalDiscount,
    });
  }

  onActionClick(event: GridActionClickEvent): void {
    switch (event.action) {
      case 'delete':
        return this.itemRemove.emit(event.item.productId);
      case 'edit':
        return this.itemEdit.emit(event.item.productId);
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

  private subscribeOnFormChanges(): void {
    this.form().valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this._cdr.markForCheck())
  }
}
