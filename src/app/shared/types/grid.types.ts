export type GridActions = 'edit';

export type GridActionClickEvent = {
  action: GridActions;
  id: string;
}

export type GridSettings = {
  label: string;
  bindProperty: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'date' | 'number';
  filterOptions?: { label: string; value: any }[];
}
