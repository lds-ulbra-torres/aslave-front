import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'searcher'
})
export class ProcurarUserPipe implements PipeTransform {

  transform(items: User[], procuraUser: string): User[]{
    if(!items)
      return [];
    if(!procuraUser)
      return items;

    procuraUser= procuraUser.toLowerCase();

    return items.filter( it=> {
      return it.full_name.toLocaleLowerCase().includes(procuraUser);
    })
  }

}
