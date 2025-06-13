import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {GridActionClickEvent, GridSettings} from '@shared/types/grid.types';
import {TooltipDirective} from '@shared/directives';
import {NgStyle} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';

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
    NgStyle
  ]
})
export class GridComponent implements OnInit {
  settings = input.required<GridSettings[]>();
  items = input.required<any[]>();

  actionClick = output<GridActionClickEvent>();
  filterChanged = output<Record<string, any>>();

  form!: FormGroup;

  private _fb = inject(FormBuilder)
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.form = this.createForm();

    this.subscribeOnFormChanges();
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

      let valueChanges = ctrl.valueChanges.pipe(takeUntilDestroyed(this._destroyRef));
      if (field.filterType && ['text', 'number'].includes(field.filterType)) {
        valueChanges = valueChanges.pipe(debounceTime(500));
      }

      valueChanges.subscribe((value) => {
        const controlKeys = Object.keys(this.form.controls);
        const result: Record<string, any> = {};
        controlKeys.forEach((key) => {
          result[key] = this.form.get(key)?.value;
        });

        this.filterChanged.emit(result);
      })
    });
  }
}
