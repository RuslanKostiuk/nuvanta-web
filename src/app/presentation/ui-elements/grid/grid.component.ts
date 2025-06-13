import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {ReactiveFormsModule} from '@angular/forms';
import {GridActionClickEvent, GridSettings} from '@shared/types/grid.types';
import {NgStyle} from '@angular/common';
import {TooltipDirective} from '@shared/directives';

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
    NgStyle,
    TooltipDirective
  ]
})
export class GridComponent {
  settings = input.required<GridSettings[]>();
  items = input.required<any[]>();

  actionClick = output<GridActionClickEvent>();
}
