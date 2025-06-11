import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, input, signal} from '@angular/core';
import {IdNameModel, ProductPreview} from '@domain/models';
import {ProductEditModalComponent} from '@presentation/modals/product-edit-modal/product-edit-modal.component';
import {GetByIdPipe} from '@shared/pipes';

@Component({
  selector: 'app-product-row',
  imports: [
    ProductEditModalComponent,
    GetByIdPipe,
  ],
  templateUrl: './product-row.component.html',
  styleUrl: './product-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRowComponent {
  readonly product = input.required<ProductPreview>();
  readonly categories = input.required<IdNameModel[]>();
  isDialogOpen = signal(false);
  private _cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      this.categories();
      this._cdr.markForCheck();
    });
  }

  onEdit() {
    this.isDialogOpen.set(true);
  }
}
