import {GridSettings} from '@shared/types/grid.types';
import {InvoiceSubtype} from '@domain/models/invoice-subtype.model';

export class InvoiceGridSettings {
  public static getSettings(params: { subtypes: InvoiceSubtype[] }): GridSettings[] {
    return [
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
        filterOptions: [{label: 'IN', value: 'IN'}, {label: 'OUT', value: 'OUT'}]
      },
      {
        label: 'Subtype',
        bindProperty: 'subtype',
        sortable: true,
        filterable: true,
        filterType: 'groupedSelect',
        groups: ['IN', 'OUT'],
        filterOptions: params.subtypes.map(this.mapSubtypeToOption)
      },
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
  }

  private static mapSubtypeToOption(subtype: InvoiceSubtype): { label: string; value: any; group: string } {
    return {
      label: subtype.name,
      value: subtype.id,
      group: subtype.type,
    }
  }
}
