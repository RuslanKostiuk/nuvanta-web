import { ProductCategoryModel } from '@domain/models/product-category.model';

export type ProductCategorySyncDto = {
  create: Pick<ProductCategoryModel, 'name'>[];
  update: Pick<ProductCategoryModel, 'id' | 'name'>[];
};
