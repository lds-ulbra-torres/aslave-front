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
      return it.input_date <= procuraMaxDate;
    })
  }

}
