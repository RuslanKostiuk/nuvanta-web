import {inject, Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductFull} from '@domain/models';

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
      isActive: [true],
      translations: this._fb.array([]),
      details: this._fb.array([]),
      images: this._fb.array([]),
      discount: this._fb.group({
        amount: [0, Validators.required],
        type: ['FIXED', Validators.required],
        validFrom: ['', Validators.required],
        validUntil: ['', Validators.required],
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
      discount: {
        amount: product.discount?.amount,
        type: product.discount?.type,
        validFrom: product.discount?.validFrom ?? '',
        validUntil: product.discount?.validUntil ?? ''
      }
    });

    product.translations.forEach(t =>
      this.translations.push(this._fb.group({
        lang: [t.lang],
        name: [t.name],
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


}
