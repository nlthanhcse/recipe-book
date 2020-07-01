import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propertyName: string) {
    if (value.length <= 0 || filterString === '') {
      return value;
    }
    const filteredValue = [];
    value.forEach(
      (item) => {
        if (item[propertyName].includes(filterString)) {
          filteredValue.push(item);
        }
      }
    );
    return filteredValue;
  }

}
