import { StockRemoval } from './../models/stock-removal';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minDate'
})
export class MinDatePipe implements PipeTransform {

  transform(items: StockRemoval[], minDate: string): StockRemoval[] {

    if(!items) return[];
    if(!minDate) return items;

    return items.filter( it => {
      return it.createdAt >= minDate;
    })
  }

}