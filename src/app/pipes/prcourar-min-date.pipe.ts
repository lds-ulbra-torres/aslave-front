import { Pipe, PipeTransform } from '@angular/core';

import { IStockInput } from './../../domain/IStockInput';

@Pipe({
  name: 'searcherMinDate'
})
export class PrcourarMinDatePipe implements PipeTransform {

  transform(items: IStockInput[], procuraMinDate: string): IStockInput[] {

    if(!items) return[];
    if(!procuraMinDate) return items;

    return items.filter( it => {
      return it.input_date >= procuraMinDate;
    })
  }

}
