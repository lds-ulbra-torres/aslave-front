import { Financial_releases } from '../models/financial_releases';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searcherP'
})
export class ProcurarPessoaNome implements PipeTransform {

  transform(items: Financial_releases[], procuraPerson: string): Financial_releases[] {
    
    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.person.name.toLocaleLowerCase().includes(procuraPerson);
    })
  }
}
