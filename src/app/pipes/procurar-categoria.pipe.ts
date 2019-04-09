import { Pipe, PipeTransform } from '@angular/core';
import { Categorias } from '../models/categories';

@Pipe({
  name: 'search_category'
})
export class ProcurarCategoriaPipe implements PipeTransform {

  transform(items: Categorias[], procuraPerson: string): Categorias[] {
    console.log("category")
    if(!items) return[];
    if(!procuraPerson) return items;

    procuraPerson = procuraPerson.toLowerCase();

    return items.filter( it => {
      return it.name_group.toLocaleLowerCase().includes(procuraPerson);
    })
  }

}
