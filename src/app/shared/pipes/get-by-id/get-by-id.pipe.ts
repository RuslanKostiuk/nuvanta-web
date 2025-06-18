import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getById',
  standalone: true,
})
export class GetByIdPipe implements PipeTransform {
  transform(id: string | number | null | undefined, list: any[], property: string = 'name'): any {
    if (!id || !Array.isArray(list)) return '';
    return list.find((item) => item?.id === id)?.[property] ?? '';
  }
}
