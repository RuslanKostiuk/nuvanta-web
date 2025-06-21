import {ChangeDetectionStrategy, Component, output} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalComponent} from '@presentation/modals/modal/modal.component';
import {GridComponent} from '@presentation/ui-elements/grid/grid.component';
import {
  CreateInventoryTransactionItemDto
} from '@infrastructure/api/inventory-transaction/dto/create-inventory-transaction.dto';
import {LucideAngularModule} from 'lucide-angular';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';

@Component({
  standalone: true,
  selector: 'app-add-inventory-modal',
  templateUrl: './add-inventory-transaction-modal.component.html',
  styleUrls: ['./add-inventory-transaction-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ModalComponent,
    ReactiveFormsModule,
    GridComponent,
    LucideAngularModule,
    NgxDaterangepickerMd
  ]
})
export class AddInventoryTransactionModalComponent {
  readonly close = output();

  save = output()

  operationDate = new Date();
  type: 'IN' | 'OUT' = 'IN';
  subtypeId = '';
  note: string | null = null;

  items: CreateInventoryTransactionItemDto[] = [];

  newItem: CreateInventoryTransactionItemDto = {
    productId: '',
    quantity: 1,
    unitPrice: null,
    discount: null,
    discountType: null
  };

  addItem() {
    if (!this.newItem.productId || this.newItem.quantity <= 0) return;

    this.items.push({...this.newItem});
    this.newItem = {
      productId: '',
      quantity: 1,
      unitPrice: null,
      discount: null,
      discountType: null
    };
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  onSubmit(): void {
  }

  // form: FormGroup;
  //
  // constructor(private fb: FormBuilder) {
  //   this.form = this.fb.group({
  //     id: [null],
  //     inventoryTransactionId: [null],
  //     shopId: ['', Validators.required],
  //     userId: [null],
  //     operationDate: [new Date(), Validators.required],
  //     type: ['IN', Validators.required],
  //     subtypeId: ['', Validators.required],
  //     sourceId: [null],
  //     totalCost: [0],
  //     totalSellingPrice: [null],
  //     totalDiscountValue: [null],
  //     note: [null],
  //     isActive: [true],
  //     items: this.fb.array([]),
  //   });
  // }
  //
  // get items(): FormArray {
  //   return this.form.get('items') as FormArray;
  // }
  //
  // addItem() {
  //   this.items.push(
  //     this.fb.group({
  //       id: [crypto.randomUUID()],
  //       inventoryTransactionId: [null],
  //       productId: ['', Validators.required],
  //       quantity: [1, [Validators.required, Validators.min(1)]],
  //       totalCost: [0, [Validators.required, Validators.min(0)]],
  //       discount: [null],
  //       discountType: [null],
  //       unitSellingPrice: [null],
  //     })
  //   );
  // }
  //
  // removeItem(index: number) {
  //   this.items.removeAt(index);
  // }
  //
  // onSubmit() {
  //   if (this.form.valid) {
  //     this.save.emit(this.form.value);
  //   } else {
  //     this.form.markAllAsTouched();
  //   }
  // }
}

