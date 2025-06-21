import { SortParams } from '@shared/types/sort-params.type';

export class SortMapper {
  static map(sort: Record<string, any>): SortParams {
    if (!sort) {
      return {};
    }

    const [sortField, sortOrder] = Object.entries(sort)[0];
    return sortOrder ? { sortField, sortOrder } : {};
  }
}
