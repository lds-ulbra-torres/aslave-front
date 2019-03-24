import { ManageService } from './manage.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { first, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  users: User[] = [];
  displayUser: boolean = true;
  user: User;

  constructor(private manageService: ManageService) { }


  ngOnInit() {
    this.getUser();
  }

  onSubmit(u){
    console.log(u);
    let user = new FormData();
    user.append('full_name', u.value.full_name)
    user.append('login', u.value.login)
    user.append('password', u.value.password)
    

    this.manageService.postUsers(user).subscribe((response) => {
      u.reset();
      console.log(response);
    })

  }

  getUser(){
    this.manageService.getUsers().pipe(first())
    .subscribe(users =>{ this.users = [... users.body.obj] });
  }
  select(u){
    this.user = Object.assign({}, u);
  }
  deleteUser(){
    this.manageService.deleteUser(this.user.id_user)
      .subscribe(
        resp => {
          this.user = null
          this.getUser();
        }
      ),
       (
         error => console.log(error)
      )
  }
 
  onDisplayUser(){
    this.displayUser = !this.displayUser;
  }
}
