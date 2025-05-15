import {Component, Input} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  @Input({required: true}) formArray!: FormArray;

  addDetail() {
    this.formArray.push(
      new FormGroup({
        key: new FormControl(''),
        value: new FormControl('')
      })
    );
  }

  getFormGroup(group: AbstractControl): FormGroup {
    return group as FormGroup
  }
}
