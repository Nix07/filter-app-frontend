import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform(value: String): String {
    value = value.split('-')[1];
    value = value[0].toUpperCase() + value.slice(1).toLowerCase();
    return value;
  }

}
