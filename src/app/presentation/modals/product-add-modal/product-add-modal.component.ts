import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {ModalComponent} from '@presentation/modals/modal/modal.component';
import {ProductMutateFormHelperService} from '@shared/helpers/product-mutate-form-helper.service';
import {ProductDetailsComponent} from '@presentation/ui-elements/product-details/product-details.component';
import {ProductDiscountComponent} from '@presentation/ui-elements/product-discount/product-discount.component';
import {ProductImagesComponent} from '@presentation/ui-elements/product-images/product-images.component';
import {ProductMainComponent} from '@presentation/ui-elements/product-main/product-main.component';
import {ProductTranslationComponent} from '@presentation/ui-elements/product-translation/product-translation.component';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrl: './product-add-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ModalComponent,
    ProductDetailsComponent,
    ProductDiscountComponent,
    ProductImagesComponent,
    ProductMainComponent,
    ProductTranslationComponent,
    ReactiveFormsModule
  ],
  providers: [ProductMutateFormHelperService]
})
export class ProductAddModalComponent {
  readonly close = output();

  private readonly _helper = inject(ProductMutateFormHelperService);

  readonly form = this._helper.createForm();

  get translations(): FormArray {
    return this._helper.translations;
  }

  get details(): FormArray {
    return this._helper.details;
  }

  get images(): FormArray {
    return this._helper.images;
  }

  get discount(): FormGroup {
    return this._helper.discount;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this._helper.markAllAsTouched();
      return;
    }
    console.log('submit');
  }
}
