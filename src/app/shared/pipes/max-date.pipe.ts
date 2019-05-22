import { Pipe, PipeTransform } from '@angular/core';
import { StockRemoval } from '../models/stock-removal';

@Pipe({
  name: 'maxDate'
})
export class MaxDatePipe implements PipeTransform {

  transform(items: StockRemoval[], maxDate: string): StockRemoval[] {

    if(!items) return[];
    if(!maxDate) return items;

    return items.filter( it => {
      return it.createdAt <= maxDate;
    })
  }

}
