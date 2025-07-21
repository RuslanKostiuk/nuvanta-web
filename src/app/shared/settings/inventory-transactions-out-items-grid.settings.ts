import {GridSettings} from '@shared/types/grid.types';
import {StringUtils} from '@shared/utils/string.utils';
import {OutItemType} from '@shared/types/inventory-transactions-modal.types';
import {NumberUtils} from '@shared/utils/number.utils';

export const inventoryTransactionsOutItemsGridSettings: GridSettings[] = [
  {
    label: 'Product',
    bindProperty: 'productName',
    styles: {'min-width': '230px', 'max-width': '380px', 'font-size': '13px'}
  },
  {label: 'Quantity', bindProperty: 'quantity', styles: {'min-width': '80px', 'font-size': '13px'}},
  {
    label: 'Discount',
    bindProperty: 'discount',
    styles: {'min-width': '80px', 'font-size': '13px'},
  },
  {
    label: 'Discount Type',
    bindProperty: 'discountType',
    styles: {'min-width': '110px', 'font-size': '13px'},
    formatter: (rowItem) => StringUtils.capitalize(rowItem.discountType),
  },
  {
    label: 'Selling Price',
    bindProperty: 'sellingPrice',
    styles: {'min-width': '140px', 'font-size': '13px'},
    formatter: (rowItem: OutItemType) => `${NumberUtils.toPrice(rowItem.sellingPrice)} - ${rowItem.discountValue}(${+NumberUtils.toPrice(rowItem.discountPercent)}%) = ${NumberUtils.toPrice(rowItem.finalPrice)}`,
  },
  {
    label: 'Total Selling Price',
    bindProperty: 'totalSellingFinalPrice',
    styles: {'min-width': '140px', 'font-size': '13px'},
    formatter: (rowItem: OutItemType) => `${NumberUtils.toPrice(rowItem.totalSellingPrice)} - ${rowItem.totalDiscount}(${+NumberUtils.toPrice(rowItem.discountPercent)}%) = ${NumberUtils.toPrice(rowItem.totalSellingFinalPrice)}`,
  },
]
