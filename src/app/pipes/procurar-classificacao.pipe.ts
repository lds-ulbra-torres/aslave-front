import { Pipe, PipeTransform } from '@angular/core';
import { Classifications } from '../models/classifications';

@Pipe({
  name: 'searcher'
})
export class ProcurarClassificationPipe implements PipeTransform {

  transform(items: Classifications[], procuraClassification: string): Classifications[] {

    if(!items) return[];
    if(!procuraClassification) return items;

    procuraClassification = procuraClassification.toLowerCase();

    return items.filter( it => {
      return it.classifation_type.toLocaleLowerCase().includes(procuraClassification);
    })
  }

}