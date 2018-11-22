import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorLogin: boolean = false;
  token: string;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }
  /**
  onSubmit(form){
    let user = new FormData();
    user.append('login', form.value.login);
    user.append('password', form.value.senha);

    this.loginService.consultLogin(user)
      .subscribe(
        (val) => {
          window.sessionStorage.setItem('userLogged',"true");
          
          this.router.navigate(['admin'])
        },
        response => {
          this.errorLogin = true;
        }
      );
  }**/
}
