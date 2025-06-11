import {IdNameModel} from '@domain/models/id-name.model';

export type ProductCategoryModel = IdNameModel & {
  productsCount: number
}
