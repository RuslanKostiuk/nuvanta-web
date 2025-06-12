import {Component, input, output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

export type FilerComponentSettings = {
  type: 'text' | 'number' | 'select',
  label?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  formControlName: string;
  options?: { id: string | number | boolean | null, name: string }[];
}

@Component({
  standalone: true,
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  imports: [
    ReactiveFormsModule
  ]
})
export class FiltersComponent {
  formGroup = input.required<FormGroup>()

  clear = output<void>();
  settings = input.required<FilerComponentSettings[]>()


  clearFilters(): void {
    this.clear.emit();
  }
}
