//import { RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
//import { LoginService } from './login.service';
//import { CanActivate } from '@angular/router/src/utils/preactivation';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**export class AuthGuardService implements CanActivate{


  constructor(private loginService: LoginService,
              private router: RouterModule ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean{
    
    if(this.loginService.userIsLogged()) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}**/

export class AuthGuardService{


  constructor() { }

}
