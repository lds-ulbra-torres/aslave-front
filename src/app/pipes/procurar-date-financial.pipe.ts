import { Pipe, PipeTransform } from '@angular/core';
import { Financial_releases } from '../models/financial_releases';

@Pipe({
  name: 'searcherMovDate'
})
export class Procurardate implements PipeTransform {

  transform(items: Financial_releases[], procuraMinDate: string): Financial_releases[] {

    console.log(procuraMinDate)
    if(!items) return[];
    if(!procuraMinDate) return items;

    return items.filter( it => {
      return it.due_date_pay == procuraMinDate;
    })
  }

}
