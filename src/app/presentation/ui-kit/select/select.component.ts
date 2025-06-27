import {ChangeDetectionStrategy, Component, forwardRef, Input, input, output, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgSelectComponent} from '@ng-select/ng-select';
import {NgStyle} from "@angular/common";
import {Subject} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgSelectComponent,
    FormsModule,
    NgStyle
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  readonly items = input.required<any[]>();
  readonly bindLabel = input('label');
  readonly bindValue = input<string | any>();
  readonly clearable = input(true);
  readonly searchable = input(true);
  readonly placeholder = input('');
  readonly groupBy = input<string | ((item: any) => string)>('');
  readonly disabled = signal(false);
  readonly styles = input<Record<string, any> | null>(null);

  @Input() typeahead!: Subject<string>;

  readonly value = signal<any>(null);

  readonly selectionChange = output<any>();

  propagateChange = (value: any) => {
  };
  propagateTouched = () => {
  };

  writeValue(value: any): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onModelChange(value: any): void {
    this.value.set(value);
    this.propagateChange(value);
    this.selectionChange.emit(value);
  }
}

