import {GridSettings} from '@shared/types/grid.types';
import {NumberUtils} from '@shared/utils/number.utils';

export const inventoryTransactionsInItemsGridSettings: GridSettings[] = [
  {
    label: 'Product',
    bindProperty: 'productName',
    styles: {'min-width': '290px', 'max-width': '380px', 'font-size': '13px'}
  },
  {label: 'Quantity', bindProperty: 'quantity', styles: {'min-width': '140px', 'font-size': '13px'}},
  {
    label: 'Unit Price',
    bindProperty: 'unitPrice',
    styles: {'min-width': '140px', 'font-size': '13px'},
    formatter: (rowItem) => NumberUtils.toPrice(rowItem.unitPrice)
  },
  {
    label: 'Total Price',
    bindProperty: 'totalPrice',
    styles: {'min-width': '140px', 'font-size': '13px'},
    formatter: (rowItem) => NumberUtils.toPrice(rowItem.totalPrice)
  }
]
