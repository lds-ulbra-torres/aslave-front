import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../models/person';

@Pipe({
  name: 'searchPerson'
})
export class ProcurarPessoaPipe implements PipeTransform {

  transform(items: Person[], procuraPerson: string): Person[] {
    
    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.name.toLocaleLowerCase().includes(procuraPerson);
    })
  }
}
