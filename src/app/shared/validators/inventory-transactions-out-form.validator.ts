import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';

export const inventoryTransactionsOutFormValidator = (form: FormGroup): ValidationErrors | null => {
  const productCtrl = form.get('product') as FormControl;
  const quantityCtrl = form.get('quantity') as FormControl;
  const discountCtrl = form.get('discount') as FormControl;
  const discountType = form.get('discountType')?.value || 'Fixed';
  const errors: Record<string, boolean> = {};
  let hasErrors = false;

  if (discountType?.toLowerCase() === 'percentage') {
    if (parseFloat(discountCtrl.value) < 0) {
      discountCtrl.setErrors({min: true});
      hasErrors = true;
      errors.minDiscountError = true
    }

    if (parseFloat(discountCtrl.value) > 100) {
      discountCtrl.setErrors({max: true});
      hasErrors = true;
      errors.maxDiscountError = true
    }
  }


  if (productCtrl.value) {
    if (quantityCtrl.value > productCtrl.value.stock) {
      quantityCtrl.setErrors({max: true});
      hasErrors = true;
      errors.maxQuantityError = true
    }

    if (discountType?.toLowerCase() === 'fixed') {
      if (parseFloat(discountCtrl.value) > parseFloat(productCtrl.value.price)) {
        hasErrors = true;
        errors.maxDiscountError = true
        discountCtrl.setErrors({max: true});
      }

      if (parseFloat(discountCtrl.value) < 0) {
        hasErrors = true;
        errors.minDiscountError = true
        discountCtrl.setErrors({min: true});
      }
    }
  } else {
    quantityCtrl.setErrors(null);

    if (discountType?.toLowerCase() === 'fixed') {
      discountCtrl.setErrors(null);
    }

    if (quantityCtrl.value < 1) {
      quantityCtrl.setErrors({min: true});
      errors.minQuantityError = true
      hasErrors = true;
    }
  }

  if (hasErrors) {
    return errors;
  }

  return null;
}
