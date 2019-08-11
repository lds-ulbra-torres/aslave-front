import { Pipe, PipeTransform } from '@angular/core';
import { Financial_releases } from '../models/financial_releases';
import * as moment from 'moment';

@Pipe({
  name: 'searcherMovDate'
})
export class Procurardate implements PipeTransform {

  transform(items: Financial_releases[], procuraMinDate: string): Financial_releases[] {

    if(!items) return[];
    if(!procuraMinDate) return items;

    return items.filter( it => {
      return moment.utc(it.due_date_pay).format("MM YYYY") == moment.utc(procuraMinDate).format("MM YYYY");
    })
  }

}
