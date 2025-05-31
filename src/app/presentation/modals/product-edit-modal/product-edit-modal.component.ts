import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal} from '@angular/core';
import {ProductFull} from '@domain/models';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ModalComponent} from '@presentation/modals/modal/modal.component';
import {ProductCategoryService, ProductService} from '@application/services';
import {ProductTranslationComponent} from '@presentation/ui-elements/product-translation/product-translation.component';
import {ProductDetailsComponent} from '@presentation/ui-elements/product-details/product-details.component';
import {ProductDiscountComponent} from '@presentation/ui-elements/product-discount/product-discount.component';
import {ProductImagesComponent} from '@presentation/ui-elements/product-images/product-images.component';
import {ProductMapper} from '@infrastructure/mappers';
import {
  ProductEditModalHelperService
} from '@presentation/modals/product-edit-modal/helpers/product-edit-modal-helper.service';

@Component({
  standalone: true,
  selector: 'app-product-edit-modal',
  imports: [
    ReactiveFormsModule,
    ModalComponent,
    ProductTranslationComponent,
    ProductDetailsComponent,
    ProductDiscountComponent,
    ProductImagesComponent,
  ],
  templateUrl: './product-edit-modal.component.html',
  styleUrl: './product-edit-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductEditModalHelperService]
})
export class ProductEditModalComponent {
  readonly productId = input.required<string>();
  readonly close = output();
  readonly save = output<ProductFull>()

  public readonly showTip = signal(false);
  public readonly product = signal<ProductFull | null>(null);

  private readonly _productService = inject(ProductService);
  private readonly _productCategoryService = inject(ProductCategoryService);
  public readonly categories = this._productCategoryService.categories;

  private readonly _helper = inject(ProductEditModalHelperService);
  readonly form = this._helper.createForm();


  constructor() {
    effect(() => {
      if (this.productId()) {
        this._productService.getById(this.productId()).subscribe(p => {
          if (p) {
            this.product.set(p);
            this._helper.fillForm(p);
          }
        });
      }
    });
  }

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


  onSubmit() {
    debugger;
    if (this.form.invalid) {
      this._helper.markAllAsTouched();
      return;
    }

    const dto = ProductMapper.mapToUpdateDto(this.form.value);

    if (dto) {
      const productId = this.productId();
      this._productService.update(productId, dto).subscribe(() => {
        this.close.emit();
      });
    }
  }

  private getUploadUrl() {
    const params = this.form.value.images?.filter((x: any) => x.ext).map((x: any) => ({
      ext: x.ext,
      contentType: x.contentType
    })) || [];

    this._productService.getUploadUrl(this.productId(), params).subscribe((r) => {

    })
  }
}
