import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';

type DatePickerModel = {
  startDate: Date | null;
  endDate: Date | null;
} | null;

@Component({
  selector: 'app-datepicker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  imports: [
    NgxDaterangepickerMd,
    FormsModule,
  ],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatepickerComponent), multi: true}
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DatepickerComponent implements ControlValueAccessor, AfterViewInit {
  value = signal<DatePickerModel>(null);
  isDisabled = signal<boolean>(false);

  isMultiple = input(false);
  styleClass = input('');

  private _propagateChange!: Function;
  private _propagateTouch!: Function;

  ngAfterViewInit() {

  }

  writeValue(value: string | Date | null | DatePickerModel): void {
    if (value === null) {
      this.value.set(null);
      return;
    }

    if (!this.isMultiple()) {
      this.value.set({startDate: new Date(value as string | Date), endDate: new Date(value as string | Date)});
    } else {
      this.value.set(value as DatePickerModel)
    }
  }

  registerOnChange(fn: Function): void {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this._propagateTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onModelChange(value: DatePickerModel): void {
    this.value.set(value);
    this._propagateChange?.(this.isMultiple() ? value : value?.startDate && new Date(value.startDate));
    this._propagateTouch?.();
  }

  onClear(): void {
    this.onModelChange(null);
  }
}
