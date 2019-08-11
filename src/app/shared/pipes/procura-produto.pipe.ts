import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'searcher_product'
})
export class ProcurarProductPipe implements PipeTransform {

    transform(items: Product[], ProcurarProduct: string): Product[] {
      console.log("product")
      if(!items) return[];
      if(!ProcurarProduct) return items;
  
      ProcurarProduct = ProcurarProduct.toLowerCase();
  
      return items.filter( it => {
        return it.name_product.toLocaleLowerCase().includes(ProcurarProduct);
      })
    }
}