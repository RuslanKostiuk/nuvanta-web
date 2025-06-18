import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-details',
  imports: [ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  @Input({ required: true }) formArray!: FormArray;

  addDetail() {
    this.formArray.push(
      new FormGroup({
        key: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required),
      }),
    );
  }

  getFormGroup(group: AbstractControl): FormGroup {
    return group as FormGroup;
  }
}
