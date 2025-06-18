import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class ProductFilterFormHelperService {
  private _fb = inject(FormBuilder);
  private _form!: FormGroup;

  public createForm(): FormGroup {
    this._form = this._fb.group({
      categoryId: [null],
      isActive: [null],
      search: [null],
      priceFrom: [null],
      priceTo: [null],
      sortBy: [null],
    });

    return this._form;
  }

  clear(): void {
    this._form.reset();
  }

  getFilterParams(): Record<string, any> {
    const params: Record<string, any> = {};
    const controls = this._form.controls;
    const ctrlKeys = Object.keys(controls);

    ctrlKeys.forEach((key) => {
      const value = this._form.get(key)?.value;
      if (value != null) {
        params[key] = value;
      }
    });

    return params;
  }
}
