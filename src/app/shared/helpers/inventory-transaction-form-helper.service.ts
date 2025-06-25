import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class InventoryTransactionFormHelperService {
  private _fb = inject(FormBuilder);
  private _form!: FormGroup;
  private _itemInForm!: FormGroup;
  private _itemOutForm!: FormGroup;

  public createForm(): FormGroup {
    this._form = this._fb.group({
      operationDate: [new Date(), [Validators.required]],
      type: ['IN', Validators.required],
      subtype: [null, Validators.required],
      note: [''],
    });

    return this._form;
  }

  public createItemInForm(): FormGroup {
    this._itemInForm = this._fb.group({
      productId: ['', Validators.required],
      quantity: [1, Validators.required],
      unitPrice: [null, Validators.required],
    });

    return this._itemInForm;
  }

  public createItemOutForm(): FormGroup {
    this._itemOutForm = this._fb.group({
      productId: ['', Validators.required],
      quantity: [1, Validators.required],
      discount: [null],
      discountType: [null],
    });

    return this._itemOutForm;
  }
}
