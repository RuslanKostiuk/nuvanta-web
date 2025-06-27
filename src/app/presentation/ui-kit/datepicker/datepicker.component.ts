import {ChangeDetectionStrategy, Component, forwardRef, input, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FlatpickrDirective, provideFlatpickrDefaults} from 'angularx-flatpickr';
import {NgStyle} from '@angular/common';

type DatePickerModel = {
  from: Date | null;
  to: Date | null;
} | null;

@Component({
  selector: 'app-datepicker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  imports: [
    FormsModule,
    FlatpickrDirective,
    NgStyle,

  ],
  providers: [
    provideFlatpickrDefaults(),
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatepickerComponent), multi: true}
  ],
})
export class DatepickerComponent implements ControlValueAccessor {
  value = signal<string | Date | null | DatePickerModel>(null);
  isDisabled = signal<boolean>(false);
  isRange = input(false);
  styles = input<Record<string, any> | null>(null);
  private _propagateChange!: Function;
  private _propagateTouch!: Function;

  writeValue(value: string | Date | null | DatePickerModel): void {
    if (value === null) {
      this.value.set(null);
      return;
    }

    this.value.set(value);
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

  onModelChange(value: string | Date | null | DatePickerModel): void {
    if (this.isRange() && (value as DatePickerModel)?.from && !(value as DatePickerModel)?.to) {
      return;
    }
    this.value.set(value);
    this._propagateChange?.(value);
    this._propagateTouch?.();
  }

  onClear(): void {
    this.onModelChange(null);
  }
}
