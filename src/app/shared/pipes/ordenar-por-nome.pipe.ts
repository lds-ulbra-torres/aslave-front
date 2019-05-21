import { User } from './../models/user';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'order'
})
export class OrdenarNomePipe implements PipeTransform {

    transform(values: User[]) {
        if(!values) return[];
    
    }
        

}
