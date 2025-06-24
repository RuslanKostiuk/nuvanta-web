import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, output, signal} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalComponent} from '@presentation/modals/modal/modal.component';
import {GridComponent} from '@presentation/ui-kit/grid/grid.component';
import {LucideAngularModule} from 'lucide-angular';
import {DatepickerComponent} from '@presentation/ui-kit/datepicker/datepicker.component';
import {SelectComponent} from '@presentation/ui-kit/select/select.component';
import {InventoryTransactionFormHelperService} from '@shared/helpers/inventory-transaction-form-helper.service';
import {
  CreateInventoryTransactionItemDto
} from '@infrastructure/api/inventory-transaction/dto/create-inventory-transaction.dto';
import {InventoryTransactionService} from '@application/services';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {InventoryTransactionSubtype} from '@domain/models/inventory-transaction-subtype.model';
import {startWith} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-add-inventory-modal',
  templateUrl: './add-inventory-transaction-modal.component.html',
  styleUrls: ['./add-inventory-transaction-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InventoryTransactionFormHelperService],
  imports: [
    ModalComponent,
    ReactiveFormsModule,
    GridComponent,
    LucideAngularModule,
    DatepickerComponent,
    SelectComponent
  ]
})
export class AddInventoryTransactionModalComponent implements OnInit {
  readonly _service = inject(InventoryTransactionService);
  readonly _destroyRef = inject(DestroyRef);
  readonly close = output();
  save = output()

  // newItem: CreateInventoryTransactionItemDto = {
  //   productId: '',
  //   quantity: 1,
  //   unitPrice: null,
  //   discount: null,
  //   discountType: null
  // };
  items: CreateInventoryTransactionItemDto[] = [];
  subtypes = signal<InventoryTransactionSubtype[]>([]);
  private _helper = inject(InventoryTransactionFormHelperService);
  form = this._helper.createForm();

  ngOnInit(): void {
    this.subscribeOnTypeChanged()
  }

  addItem() {

  }

  removeItem(index: number) {
  }

  onSubmit(): void {
  }

  private subscribeOnTypeChanged(): void {
    this.form.get('type')?.valueChanges.pipe(startWith('IN'), takeUntilDestroyed(this._destroyRef)).subscribe((type) => {
      const subtypes = this._service.subtypes().filter((x) => x.type === type);
      this.subtypes.set(subtypes);
      this.form.get('subtype')?.setValue(null);
    });
  }
}

