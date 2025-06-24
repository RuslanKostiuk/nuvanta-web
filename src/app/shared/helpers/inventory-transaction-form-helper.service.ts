import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class InventoryTransactionFormHelperService {
  private _fb = inject(FormBuilder);
  private _form!: FormGroup;

  public createForm(): FormGroup {
    this._form = this._fb.group({
      operationDate: [new Date(), [Validators.required]],
      type: ['IN', Validators.required],
      subtype: [null, Validators.required],
      note: [''],
    });

    return this._form;
  }
}
