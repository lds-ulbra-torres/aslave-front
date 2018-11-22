import { Injectable } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  //ng gconstructor(private http: HttpClient) { }

 /** consultLogin(user){
    return this.http.post('http://api-teste-aslave-org-br.umbler.net/auth',user);
  }
  userIsLogged(){
    let checklogin = window.sessionStorage.getItem('userLogged');
    if(checklogin=="true"){
      return true;
    }
    else {
      return false;
    }
  }**/
}
