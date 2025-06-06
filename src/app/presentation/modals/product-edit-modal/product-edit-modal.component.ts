import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal} from '@angular/core';
import {ProductFull} from '@domain/models';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ModalComponent} from '@presentation/modals/modal/modal.component';
import {ProductService} from '@application/services';
import {ProductDetailsComponent} from '@presentation/ui-elements/product-details/product-details.component';
import {ProductDiscountComponent} from '@presentation/ui-elements/product-discount/product-discount.component';
import {ProductImagesComponent} from '@presentation/ui-elements/product-images/product-images.component';
import {ProductMapper} from '@infrastructure/mappers';
import {ProductMutateFormHelperService} from '@shared/helpers/product-mutate-form-helper.service';
import {ProductMainComponent} from '@presentation/ui-elements/product-main/product-main.component';
import {UploadUrlResponse} from '@infrastructure/api/product-image/dto/upload-url.response';

@Component({
  standalone: true,
  selector: 'app-product-edit-modal',
  imports: [
    ReactiveFormsModule,
    ModalComponent,
    ProductDetailsComponent,
    ProductDiscountComponent,
    ProductImagesComponent,
    ProductMainComponent,
  ],
  templateUrl: './product-edit-modal.component.html',
  styleUrl: './product-edit-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductMutateFormHelperService]
})
export class ProductEditModalComponent {
  readonly productId = input.required<string>();
  readonly close = output();

  readonly isInitialized = signal(false);

  public readonly product = signal<ProductFull | null>(null);

  private readonly _productService = inject(ProductService);

  private readonly _helper = inject(ProductMutateFormHelperService);
  readonly form = this._helper.createForm();


  constructor() {
    effect(() => {
      if (this.productId()) {
        this._productService.getById(this.productId()).subscribe(p => {
          if (p) {
            this.product.set(p);
            this._helper.fillForm(p);
          }

          this.isInitialized.set(true);
        });
      }
    });
  }

  // get translations(): FormArray {
  //   return this._helper.translations;
  // }

  get details(): FormArray {
    return this._helper.details;
  }

  get images(): FormArray {
    return this._helper.images;
  }

  get discount(): FormGroup {
    return this._helper.discount;
  }


  onSubmit() {
    if (this.form.invalid) {
      this._helper.markAllAsTouched();
      return;
    }

    const uploadUrlParams = this._helper.getUploadUrlParams();
    this._productService.getUploadUrl(this.productId(), uploadUrlParams).subscribe(async (uploadData: UploadUrlResponse[] | null) => {
      const dto = ProductMapper.mapToUpdateDto(this.form.value, uploadData);

      if (dto) {
        const productId = this.productId();

        await this._productService.uploadImages(this._helper.getUploadParams(uploadData));

        this._productService.update(productId, dto).subscribe(() => {
          this.close.emit();
        });
      }
    });
  }
}
