import {inject, Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductFull} from '@domain/models';
import {DateUtils} from '@shared/utils/date.utils';

@Injectable()
export class ProductEditModalHelperService {
  private _form!: FormGroup
  private readonly _fb = inject(FormBuilder);

  get translations(): FormArray {
    return this._form.get('translations') as FormArray;
  }

  get details(): FormArray {
    return this._form.get('details') as FormArray;
  }

  get images(): FormArray {
    return this._form.get('images') as FormArray;
  }

  get discount(): FormGroup {
    return this._form.get('discount') as FormGroup;
  }

  createForm(): FormGroup {
    this._form = this._fb.group({
      sku: ['', Validators.required],
      price: [0, Validators.required],
      popularityThreshold: [0, Validators.required],
      categoryId: ['', Validators.required],
      isActive: [true],
      translations: this._fb.array([]),
      details: this._fb.array([]),
      images: this._fb.array([]),
      discount: this._fb.group({
        amount: [0.00, [Validators.min(0), Validators.pattern(/[0-9]*/)]],
        type: ['fixed'],
        validFrom: [''],
        validUntil: [''],
      })
    });

    return this._form;
  }

  fillForm(product: ProductFull) {
    this._form.patchValue({
      sku: product.sku,
      price: product.price.amount,
      popularityThreshold: product.popularityThreshold,
      isActive: product.isActive,
      categoryId: product.categoryId,
      discount: {
        amount: product.discount?.amount,
        type: product.discount?.type,
        validFrom: DateUtils.formatDateForInput(product.discount?.validFrom) ?? '',
        validUntil: DateUtils.formatDateForInput(product.discount?.validUntil) ?? ''
      }
    });

    product.translations.forEach(t =>
      this.translations.push(this._fb.group({
        lang: [t.lang, Validators.required],
        name: [t.name, Validators.required],
        description: [t.description]
      }))
    );

    if (product.details) {
      product.details.forEach(({key, value}) =>
        this.details.push(this._fb.group({key: [key], value: [value]}))
      );
    }

    product.images.forEach(url =>
      this.images.push(new FormControl(url))
    );
  }

  markAllAsTouched(): void {
    this._form.markAsTouched();

    this.markFormArrayAsTouched(this.translations);
    this.markFormArrayAsTouched(this.details);
  }

  private markFormArrayAsTouched(formArray: FormArray): void {
    formArray.controls.forEach((c) => {
      c.markAsTouched();
      const ctrls = (c as FormGroup).controls as Record<string, FormControl>;
      const ctrlKeys = Object.keys(ctrls);
      ctrlKeys.forEach((key) => ctrls[key].markAsTouched());
    });
  }
}
