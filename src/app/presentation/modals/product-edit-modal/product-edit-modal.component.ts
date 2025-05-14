import {Component, effect, inject, input, OnInit, output, signal} from '@angular/core';
import {ProductFull} from '@domain/models';
import {FormsModule} from '@angular/forms';
import {ModalComponent} from '@presentation/modals/modal/modal.component';
import {ProductService} from '@application/services';

@Component({
  selector: 'app-product-edit-modal',
  imports: [
    FormsModule,
    ModalComponent,
  ],
  templateUrl: './product-edit-modal.component.html',
  styleUrl: './product-edit-modal.component.scss'
})
export class ProductEditModalComponent implements OnInit {
  productId = input.required<string>();
  close = output();
  save = output<ProductFull>()
  activeLang = signal<string>('ua');
  name: string = '';
  description: string = '';
  details: { key: string; value: string }[] = [];
  images: string[] = [];
  newImage: string = '';
  dynamicLangs: string[] = [];
  readonly product = signal<ProductFull | null>(null);
  private readonly _productService = inject(ProductService);

  constructor() {
    effect(() => {
      if (this.productId) {
        this._productService.getById(this.productId()).subscribe(p => {
          this.product.set(p);
        });
      }
    });
  }

  ngOnInit() {
    // const existingLangs = Object.keys(this.product.langs);
    this.dynamicLangs = ['en', 'ua', 'pl']
    this.name = this.product()?.name || '';
    this.description = this.product()?.description || '';

    // this.dynamicLangs.forEach(lang => {
    //   this.name[lang] = (this.product as any).name?.[lang] ?? '';
    //   this.description[lang] = (this.product as any).description?.[lang] ?? '';
    // });

    const raw = (this.product as any).details ?? {};
    this.details = Object.entries(raw).map(([key, value]) => ({key, value} as { key: string; value: string }));

    this.images = [...(this.product()?.images ?? [])];
  }

  addDetail() {
    this.details.push({key: '', value: ''});
  }

  removeDetail(index: number) {
    this.details.splice(index, 1);
  }

  addImage() {
    if (this.newImage.trim() && this.images.length < 3) {
      this.images.push(this.newImage.trim());
      this.newImage = '';
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  onSave() {
    console.log('save', this.product);
  }

  //   const updated: Product = {
  //     ...this.product,
  //     name: this.name,
  //     description: this.description,
  //     details: Object.fromEntries(
  //       this.details.filter(d => d.key.trim() !== '').map(d => [d.key, d.value])
  //     ),
  //     images: this.images,
  //   };
  //   //TODO: add mapper
  //   this.save.emit(updated as Product);
  // }
}
