import { Pipe, PipeTransform } from '@angular/core';
import { Categorias } from '../models/categories';

@Pipe({
  name: 'searcher'
})
export class ProcurarCategoriaPipe implements PipeTransform {

  transform(items: Categorias[], procuraPerson: string): Categorias[] {

    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.name_group.toLocaleLowerCase().includes(procuraPerson);
    })
  }

}
