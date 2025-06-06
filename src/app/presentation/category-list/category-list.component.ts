import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ProductCategoryService} from '@application/services';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: 'category-list.component.scss',
})
export class CategoryListComponent {
  private _categoryService = inject(ProductCategoryService);

  public categories = this._categoryService.categories;

  openAddModal(): void {
  }
}
