import {Component, Input} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-translation',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-translation.component.html',
  styleUrl: './product-translation.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProductTranslationComponent {
  @Input({required: true}) formArray!: FormArray;

  constructor(private fb: FormBuilder) {
  }

  getForm(form: AbstractControl): FormGroup {
    return form as FormGroup;
  }

  addTranslation() {
    this.formArray.push(this.fb.group({
      lang: [''],
      name: [''],
      description: ['']
    }));
  }

  removeTranslation(index: number) {
    this.formArray.removeAt(index);
  }
}
