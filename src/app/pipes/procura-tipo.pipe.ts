import { Pipe, PipeTransform } from '@angular/core';

import { IStockInput } from './../../domain/IStockInput';

@Pipe({
  name: 'searcherType'
})
export class ProcuraTipoPipe implements PipeTransform {

  transform(items: IStockInput[], procuraTipo: number): IStockInput[] {

    if(!items) return[];
    if(!procuraTipo) return items;
    if(procuraTipo==0) return items;

    return items.filter( it => {
      return it.input_type == procuraTipo;
    })
  }

}
