import { Financial_releases } from '../models/financial_releases';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searcher_mov'
})
export class ProcurarMovPipe implements PipeTransform {

  transform(items: Financial_releases[], procuraMov: string): Financial_releases[] {

    if(!items) return[];
    if(!procuraMov) return items;
    
    return items.filter( it => {
      return it.type_mov == procuraMov;
    })
  }

}