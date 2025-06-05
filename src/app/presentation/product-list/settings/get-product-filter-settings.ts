import {IdNameModel} from '@domain/models';
import {FilerComponentSettings} from '@presentation/ui-elements/filters/filters.component';

export function getProductFilterSettings(categories: IdNameModel[]): FilerComponentSettings[] {
  return [
    {
      type: 'select',
      label: 'Category',
      formControlName: 'categoryId',
      options: [{id: null, name: 'All'}, ...categories],
    },
    {
      type: 'select',
      label: 'Status',
      formControlName: 'isActive',
      options: [{id: null, name: 'All'}, {id: true, name: 'Active'}, {id: false, name: 'Inactive'}],
    },
    {
      type: 'text',
      label: 'Search',
      formControlName: 'search',
      placeholder: 'Name or SKU',
    },
    {
      type: 'number',
      label: 'Price From',
      formControlName: 'priceFrom',
      placeholder: 'Min',
    },
    {
      type: 'number',
      label: 'Price To',
      formControlName: 'priceTo',
      placeholder: 'Max',
    },
    {
      type: 'select',
      label: 'Sort by',
      formControlName: 'sortBy',
      options: [
        {id: null, name: 'Default'},
        {id: 'activeFirst', name: 'Active First'},
        {id: 'inactiveFirst', name: 'Inactive First'},
        {id: 'lowestPrice', name: 'Lowest Price'},
        {id: 'highestPrice', name: 'Highest Price'},
        {id: 'mostPopular', name: 'Most Popular'},
      ],
    },
  ];
}
