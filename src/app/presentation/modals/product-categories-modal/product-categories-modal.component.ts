import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { ModalComponent } from '@presentation/modals/modal/modal.component';
import { ProductCategoryService } from '@application/services';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ManageCategoriesHelperService } from '@shared/helpers/manage-categories-helper.service';
import { ProductCategorySyncDto } from '@infrastructure/api/product-category/dto/product-category-sync.dto';

@Component({
  standalone: true,
  selector: 'app-product-categories-modal',
  templateUrl: './product-categories-modal.component.html',
  styleUrl: './product-categories-modal.component.scss',
  imports: [ModalComponent, ReactiveFormsModule],
  providers: [ManageCategoriesHelperService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCategoriesModalComponent implements OnInit {
  readonly close = output();
  public formExisting!: FormArray<FormGroup>;
  public formNew!: FormArray<FormGroup>;
  private readonly _productCategoryService = inject(ProductCategoryService);
  readonly categories = this._productCategoryService.productCategoriesWithProdCount;
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _helper = inject(ManageCategoriesHelperService);

  constructor() {
    effect(() => {
      this.formExisting = this._helper.createForExisting(this.categories());
      this._cdr.markForCheck();
    });
  }

  ngOnInit() {
    this._productCategoryService.fetchCategoriesWithProdCount();
    this.formNew = this._helper.createForNew();
  }

  add(): void {
    this._helper.add();
  }

  remove(index: number): void {
    this._helper.remove(index);
  }

  save(): void {
    if (this.formExisting.invalid) {
      return;
    }

    const update = this._helper.getUpdated();
    const create = this._helper.getNew();

    if (create?.length || update?.length) {
      this._productCategoryService
        .sync({ create, update } as ProductCategorySyncDto)
        .subscribe(() => {
          this.close.emit();
        });
    }
  }
}
