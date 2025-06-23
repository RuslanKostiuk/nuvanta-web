import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {GridActionClickEvent, GridSettings} from '@shared/types/grid.types';
import {TooltipDirective} from '@shared/directives';
import {NgClass, NgStyle} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime, filter} from 'rxjs';
import {DatepickerComponent} from '@presentation/ui-kit/datepicker/datepicker.component';

@Component({
  standalone: true,
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideAngularModule,
    NgxDaterangepickerMd,
    ReactiveFormsModule,
    TooltipDirective,
    NgStyle,
    NgClass,
    DatepickerComponent,
  ],
})
export class GridComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  settings = input.required<GridSettings[]>();
  items = input.required<any[]>();
  total = input.required<number>();
  filterable = input(false);

  actionClick = output<GridActionClickEvent>();
  filterChanged = output<Record<string, any>>();
  sortChanged = output<Record<string, 'asc' | 'desc' | null>>();
  resetFilters = output<void>();
  scrollEnd = output<void>();

  sortDirection = signal<'asc' | 'desc' | null>(null);
  sortColumn: string = '';
  form!: FormGroup;

  private _fb = inject(FormBuilder);
  private _destroyRef = inject(DestroyRef);
  private _sortQueue = ['asc', 'desc', null];
  private _isResetEvent = false;
  private _lastLoadedCount = 0;

  ngOnInit() {
    this.form = this.createForm();

    this.subscribeOnFormChanges();
  }

  onSortChange(column: string): void {
    if (column !== this.sortColumn) {
      this.sortColumn = column;
      this.sortDirection.set('asc');
      this.sortChanged.emit({[column]: this.sortDirection()});
      return;
    }

    this.sortColumn = column;
    const curDirectionPos = this._sortQueue.findIndex((x) => x === this.sortDirection());
    const selectedPos = curDirectionPos + 1 === this._sortQueue.length ? 0 : curDirectionPos + 1;
    const sortDirection = this._sortQueue.at(selectedPos) as 'asc' | 'desc' | null;
    this.sortDirection.set(sortDirection);
    this.sortChanged.emit({[column]: this.sortDirection()});
  }

  onResetFilters(): void {
    this._isResetEvent = true;
    this.sortDirection.set(null);
    this.form.reset(null, {emitEvent: false});

    this.resetFilters.emit();
    this._isResetEvent = false;
  }

  onScrollChanged(): void {
    if (this._lastLoadedCount === this.items().length || this.total() === this.items().length) {
      return;
    }

    const el = this.scrollContainer.nativeElement;
    const bottomReached = el.scrollTop + el.clientHeight >= el.scrollHeight - 100;

    if (bottomReached) {
      this._lastLoadedCount = this.items().length;
      this.scrollEnd.emit();
    }
  }

  onClearFilter(property: string): void {
    this.form.get(property)?.setValue(null);
  }

  private createForm(): FormGroup {
    const controls: Record<string, any> = {};

    this.settings().forEach((field) => {
      if (field.filterable) {
        controls[field.bindProperty] = [null];
      }
    });

    return this._fb.group(controls);
  }

  private subscribeOnFormChanges(): void {
    this.settings().forEach((field) => {
      const ctrl = this.form.get(field.bindProperty);
      if (!ctrl) {
        return;
      }

      let valueChanges = ctrl.valueChanges.pipe(
        takeUntilDestroyed(this._destroyRef),
        filter(() => !this._isResetEvent),
      );
      if (field.filterType && ['text', 'number'].includes(field.filterType)) {
        valueChanges = valueChanges.pipe(debounceTime(500));
      }

      valueChanges.subscribe((value) => {
        const result: Record<string, any> = this.buildFilterModel();

        this.filterChanged.emit(result);
      });
    });
  }

  private buildFilterModel(): Record<string, any> {
    const controlKeys = Object.keys(this.form.controls);
    const result: Record<string, any> = {};
    controlKeys.forEach((key) => {
      result[key] = this.form.get(key)?.value;
    });

    return result;
  }
}
