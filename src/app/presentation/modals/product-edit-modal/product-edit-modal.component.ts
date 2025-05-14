import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal} from '@angular/core';
import {ProductFull} from '@domain/models';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModalComponent} from '@presentation/modals/modal/modal.component';
import {ProductService} from '@application/services';

@Component({
  selector: 'app-product-edit-modal',
  imports: [
    ReactiveFormsModule,
    ModalComponent,
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
    discounts: this._fb.array([])
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

  get discounts(): FormArray {
    return this.form.get('discounts') as FormArray;
  }

  fillForm(product: ProductFull) {
    this.form.patchValue({
      sku: product.sku,
      price: product.price.amount,
      stock: product.stock,
      isActive: product.isActive
    });

    product.translations.forEach(t =>
      this.translations.push(this._fb.group({
        lang: [t.lang],
        name: [t.name],
        description: [t.description]
      }))
    );

    Object.entries(product.details).forEach(([key, value]) =>
      this.details.push(this._fb.group({key: [key], value: [value]}))
    );

    product.images.forEach(url =>
      this.images.push(this._fb.group({url: [url]}))
    );

    this.discounts.push(this._fb.group({
      amount: [product.discount?.amount],
      type: [product.discount?.type],
      validFrom: [product.discount?.validFrom ?? ''],
      validUntil: [product.discount?.validUntil ?? '']
    }));

  }

  onSubmit() {
    if (this.form.valid) {
      // TODO: map form value back to ProductFull and emit
      console.log(this.form.value);
    }
  }
}
