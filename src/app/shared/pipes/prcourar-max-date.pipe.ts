import { Pipe, PipeTransform } from '@angular/core';
import { IStockInput } from '../models/IStockInput';
@Pipe({
  name: 'searcherMaxDate'
})
export class PrcourarMaxDatePipe implements PipeTransform {
  transform(items: IStockInput[], procuraMaxDate: string): IStockInput[] {

    if(!items) return[];
    if(!procuraMaxDate) return items;

    return items.filter( it => {
      return procuraMaxDate+'T12:01:01.000Z' >= it.input_date;
    })
  }

}
