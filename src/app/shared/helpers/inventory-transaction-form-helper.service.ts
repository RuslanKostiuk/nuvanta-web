import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {auditTime, distinctUntilChanged, pairwise, startWith, Subject, takeUntil} from 'rxjs';
import {NumberUtils} from '@shared/utils/number.utils';
import {StringUtils} from '@shared/utils/string.utils';

@Injectable()
export class InventoryTransactionFormHelperService {
  private _fb = inject(FormBuilder);
  private _form!: FormGroup;
  private _itemInForm!: FormGroup;
  private _itemOutForm!: FormGroup;

  private _destroy$ = new Subject<void>();

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
    this.destroy()

    this._itemInForm = this._fb.group({
      product: [null, Validators.required],
      quantity: [1, Validators.required],
      unitPrice: [null, Validators.required],
    });

    return this._itemInForm;
  }

  public createItemOutForm(): FormGroup {
    this.destroy()

    this._itemOutForm = this._fb.group({
      product: [null, Validators.required],
      quantity: [1, Validators.required],
      discount: [0],
      discountType: ['Fixed'],
      price: [{value: null, disabled: true}],
      totalPrice: [{value: null, disabled: true}],
      finalPrice: [{value: null, disabled: true}],
      discountValue: [{value: null, disabled: true}],
      totalFinalPrice: [{value: null, disabled: true}],
      totalDiscount: [{value: null, disabled: true}],
    });

    this.subscribeOnOutFormChanges();

    return this._itemOutForm;
  }

  public destroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private subscribeOnOutFormChanges(): void {
    this._itemOutForm.valueChanges.pipe(
      startWith(this._itemOutForm.value),
      takeUntil(this._destroy$),
      auditTime(0),
      distinctUntilChanged(),
      pairwise(),
      // filter(([prev, curr]) => JSON.stringify(prev) !== JSON.stringify(curr)),
    ).subscribe(([prev, current]) => {
      if (!current?.product) {
        return;
      }

      const discountCtrl = this._itemOutForm.get('discount') as FormControl;
      const discountTypeCtrl = this._itemOutForm.get('discountType') as FormControl;


      const discount = (current.product !== prev?.product && current.product.discount ? current.product.discount : discountCtrl?.value) || 0;
      const discountType = (current.product !== prev?.product ? current.product.discountType : discountTypeCtrl?.value) || 'fixed';
      const price = current.product.price;

      const discountValue = discountType.toLowerCase() === 'fixed' || !discount ? discount : discount * price / 100;
      const finalPrice = price - discountValue;
      const quantity = current.quantity ?? 1;
      const totalPrice = price * quantity;
      const totalDiscount = discountValue * quantity;
      const totalFinalPrice = totalPrice - totalDiscount;

      this._itemOutForm.patchValue({
        price: NumberUtils.toPrice(price),
        finalPrice: NumberUtils.toPrice(finalPrice),
        discount,
        discountType: StringUtils.capitalize(discountType),
        discountValue: NumberUtils.toPrice(discountValue),
        totalPrice: NumberUtils.toPrice(totalPrice),
        totalDiscount: NumberUtils.toPrice(totalDiscount),
        totalFinalPrice: NumberUtils.toPrice(totalFinalPrice),
      }, {emitEvent: false});
    });
  }
}
