import {Component, inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-product-translation',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './product-translation.component.html',
  styleUrl: './product-translation.component.scss',
  standalone: true,
})
export class ProductTranslationComponent implements OnInit {
  @Input({required: true}) formArray!: FormArray;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    if (!this.formArray?.length) {
      this.addTranslation();
    }
  }

  getForm(form: AbstractControl): FormGroup {
    return form as FormGroup;
  }

  addTranslation() {
    this.formArray.push(this.fb.group({
      lang: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    }));
  }

  removeTranslation(index: number) {
    this.formArray.removeAt(index);

    if (!this.formArray.length) {
      this.addTranslation();
    }
  }
}
