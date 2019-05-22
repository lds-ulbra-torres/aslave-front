import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './containers/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: string;

  constructor(
      private router: Router,
      private authenticationService: LoginService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logOut(){
    this.router.navigate['/login'];
    this.authenticationService.logout();
    
  }
}
