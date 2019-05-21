import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';
import { LoginService } from '../containers/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.currentUser.subscribe(data => this.currentUser = data);
    
   }

  ngOnInit() {
  }
 

  
}
