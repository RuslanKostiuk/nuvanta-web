import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal} from '@angular/core';
import {ProductFull} from '@domain/models';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModalComponent} from '@presentation/modals/modal/modal.component';
import {ProductService} from '@application/services';
import {ProductTranslationComponent} from '@presentation/ui-elements/product-translation/product-translation.component';
import {ProductDetailsComponent} from '@presentation/ui-elements/product-details/product-details.component';
import {ProductDiscountComponent} from '@presentation/ui-elements/product-discount/product-discount.component';

@Component({
  selector: 'app-product-edit-modal',
  imports: [
    ReactiveFormsModule,
    ModalComponent,
    ProductTranslationComponent,
    ProductDetailsComponent,
    ProductDiscountComponent,
  ],
  templateUrl: './product-edit-modal.component.html',
  styleUrl: './product-edit-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditModalComponent {
  productId = input.required<string>();
  close = output();
  save = output<ProductFull>()
  readonly product = signal<ProductFull | null>(null);
  private readonly _productService = inject(ProductService);
  private readonly _fb = inject(FormBuilder);
  readonly form = this._fb.group({
    sku: ['', Validators.required],
    price: [0, Validators.required],
    stock: [0, Validators.required],
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


  constructor() {
    effect(() => {
      if (this.productId()) {
        this._productService.getById(this.productId()).subscribe(p => {
          if (p) this.fillForm(p);
        });
      }
    });
  }

  get translations(): FormArray {
    return this.form.get('translations') as FormArray;
  }

  get details(): FormArray {
    return this.form.get('details') as FormArray;
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  get discount(): FormGroup {
    return this.form.get('discount') as FormGroup;
  }

  fillForm(product: ProductFull) {
    this.form.patchValue({
      sku: product.sku,
      price: product.price.amount,
      stock: product.stock,
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
      Object.entries(product.details).forEach(([key, value]) =>
        this.details.push(this._fb.group({key: [key], value: [value]}))
      );
    }

    product.images.forEach(url =>
      this.images.push(this._fb.group({url: [url]}))
    );
  }

  openStockModal() {
    console.log('open StockModal');
  }

  onSubmit() {
    if (this.form.valid) {
      // TODO: map form value back to ProductFull and emit
      console.log(this.form.value);
    }
  }
}
