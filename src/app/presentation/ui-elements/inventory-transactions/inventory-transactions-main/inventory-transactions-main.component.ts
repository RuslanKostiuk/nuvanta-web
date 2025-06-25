import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DatepickerComponent} from '@presentation/ui-kit/datepicker/datepicker.component';
import {SelectComponent} from '@presentation/ui-kit/select/select.component';
import {InventoryTransactionSubtype} from '@domain/models/inventory-transaction-subtype.model';
import {InventoryTransactionService} from '@application/services';
import {startWith} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-inventory-transactions-main',
  templateUrl: './inventory-transactions-main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./inventory-transactions-main.component.scss'],
  imports: [
    DatepickerComponent,
    SelectComponent,
    ReactiveFormsModule
  ]
})
export class InventoryTransactionsMainComponent implements OnInit {
  form = input.required<FormGroup>();
  subtypes = signal<InventoryTransactionSubtype[]>([]);
  typeChanged = output<'IN' | 'OUT'>()
  readonly _service = inject(InventoryTransactionService);
  readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.subscribeOnTypeChanged();
  }

  private subscribeOnTypeChanged(): void {
    this.form().get('type')?.valueChanges.pipe(startWith('IN'), takeUntilDestroyed(this._destroyRef)).subscribe((type) => {
      const subtypes = this._service.subtypes().filter((x) => x.type === type);
      this.subtypes.set(subtypes);
      this.form().get('subtype')?.setValue(null);
      this.typeChanged.emit(type);
    });
  }
}
