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
  filterType?: 'text' | 'select' | 'date' | 'number' | 'groupedSelect';
  filterOptions?: { label: string; value: any; group?: string }[];
  groups?: string[];
  styles?: Record<string, any>
}
