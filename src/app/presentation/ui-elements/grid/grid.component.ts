import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {ReactiveFormsModule} from '@angular/forms';
import {GridActionClickEvent, GridSettings} from '@shared/types/grid.types';

@Component({
  standalone: true,
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideAngularModule,
    NgxDaterangepickerMd,
    ReactiveFormsModule
  ]
})
export class GridComponent {
  settings = input.required<GridSettings[]>();
  items = input.required<any[]>();

  actionClick = output<GridActionClickEvent>();
}
