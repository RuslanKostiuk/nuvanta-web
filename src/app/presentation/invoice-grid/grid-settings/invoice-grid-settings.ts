import {GridSettings} from '@shared/types/grid.types';

export const INVOICE_GRID_SETTINGS: GridSettings[] = [
  {
    label: 'Date',
    bindProperty: 'operationDate',
    sortable: true,
    filterable: true,
    filterType: 'date',
    styles: {'max-width': '100px'}
  },
  {
    label: 'Type',
    bindProperty: 'type',
    sortable: true,
    filterable: true,
    filterType: 'select',
    filterOptions: [{label: 'All', value: null}, {label: 'IN', value: 'IN'}, {label: 'OUT', value: 'OUT'}]
  },
  {label: 'Subtype', bindProperty: 'subtype', sortable: true, filterable: true, filterType: 'text'},
  {
    label: 'Products',
    bindProperty: 'productCount',
    sortable: true,
    filterable: true,
    filterType: 'number',
    styles: {'max-width': '50px'}
  },
  {
    label: 'Quantity',
    bindProperty: 'totalQuantity',
    sortable: true,
    filterable: true,
    filterType: 'number',
    styles: {'max-width': '50px'}
  },
  {
    label: 'Total',
    bindProperty: 'totalValue',
    sortable: true,
    filterable: true,
    filterType: 'number',
    styles: {'max-width': '70px'}
  },
  {
    label: 'Note',
    bindProperty: 'note',
    filterable: true,
    filterType: 'text',
    styles: {'max-width': '200px'}
  },
]
