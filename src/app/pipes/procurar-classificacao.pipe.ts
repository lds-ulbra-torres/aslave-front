import { Pipe, PipeTransform } from '@angular/core';

import { Classifications } from '../models/classifications';

@Pipe({
  name: 'buscador'
})
export class ProcurarClassificationPipe implements PipeTransform {

  transform(items: Classifications[], procuraClassification: string): Classifications[] {

    if(!items) return[];
    if(!procuraClassification) return items;
    
    return items.filter( it => {
      return it.classifation_type == procuraClassification;
    })
  }

}