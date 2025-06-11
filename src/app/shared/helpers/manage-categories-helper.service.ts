import {inject, Injectable} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {ProductCategoryModel} from '@domain/models/product-category.model';

@Injectable()
export class ManageCategoriesHelperService {
  private _existing!: FormArray;
  private _new!: FormArray;
  private readonly _fb = inject(FormBuilder);

  public createForExisting(categories: ProductCategoryModel[]): FormArray {
    this._existing = this._fb.array(categories.map((c) => {
      return this._fb.group({
        id: [c.id],
        name: [c.name, [Validators.required, Validators.minLength(2)]],
        initialName: [c.name],
        productsCount: [c.productsCount],
      })
    }));

    return this._existing;
  }

  public createForNew(): FormArray {
    this._new = this._fb.array([]);

    return this._new;
  }

  public add(): void {
    this._new.push(this._fb.group({name: ['']}))
  }

  public remove(index: number): void {
    this._new.removeAt(index);
  }
}
