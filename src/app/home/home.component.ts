import { LoginService } from './../login/login.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  username: string;
  constructor(private loginService: LoginService) {
    this.username = this.loginService.username;
   }


  ngOnInit() {
    
  }

}
