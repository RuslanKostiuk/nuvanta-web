import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SelectComponent} from '@presentation/ui-kit/select/select.component';
import {ProductSearch} from '@domain/models/product-search.model';
import {debounceTime, distinctUntilChanged, filter, Subject, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProductService} from '@application/services';
import {OutItemType} from '@shared/types/inventory-transactions-modal.types';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inventory-transactions-out-items',
  templateUrl: './inventory-transactions-out-items.component.html',
  styleUrls: ['./inventory-transactions-out-items.component.scss'],
  imports: [
    LucideAngularModule,
    ReactiveFormsModule,
    SelectComponent
  ]
})
export class InventoryTransactionsOutItems implements OnInit {
  items = input.required<OutItemType[]>();
  form = input.required<FormGroup>();
  products = signal<ProductSearch[]>([]);
  productTypehead$ = new Subject<string>();
  private _destroyRef = inject(DestroyRef);
  private _productService = inject(ProductService);

  ngOnInit() {
    this.subscribeOnTypehead();
  }

  onAddItemClick(): void {

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
