import { ProcurarNomePipe } from './../pipes/procurar-nome.pipe';
import { User } from './../models/user';
import { ManageService } from './manage.service';
import { Component, OnInit } from '@angular/core';

import { first, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { OrdenarNomePipe } from '../pipes/ordenar-por-nome.pipe';

import { ProcurarUserPipe } from '../pipes/procurar-user.pipe';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  users: User[] = [];
  displayUser: boolean = true;
  toggleUsers: boolean = true;
  user: User;
  isLoading: boolean = true;
  username: OrdenarNomePipe;
  teste: User[] = [];
  i: number;
  procuraUser: ProcurarUserPipe;
  

  constructor(private manageService: ManageService) { }


  ngOnInit() {
    this.getUser();
  }


  onSubmit(u){
    
    console.log(u);
    /*if(this.user.id_user || this.user.id_user!=0){
      let upUser = new FormData();
      upUser.append('full_name', this.user.full_name)
      upUser.append('login', this.user.login)
      upUser.append('password', this.user.password)
      this.updateUser(upUser, this.user.id_user );
    }else{*/
      let user = new FormData();
      user.append('full_name', u.value.full_name)
      user.append('login', u.value.login)
      user.append('password', u.value.password)
    
    
      this.manageService.postUsers(user).subscribe((response) => {
        u.reset();
        this.displayUser = !this.displayUser;
        this.getUser;
        console.log(response);
      })
  
   // }
    
  }

  updateUser(u, id){
    this.manageService.updateUser(u, id).subscribe((response)=>{
      this.displayUser = !this.displayUser;
      this.getUser;
      this.user = null;
    })
  }
  
  getUser(){
    this.manageService.getUsers().pipe(first())
    .subscribe(users =>{ this.users = [... users.body.obj] 
    this.isLoading = false;
    this.orderByName();
    });
  }
  select(u){
    this.user = Object.assign({}, u);
  }

  selectUpdate(u){
    this.user = Object.assign({}, u);
    this.onDisplayUser();
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
  togglingUsers(){
    this.displayUser = !this.displayUser;
    this.toggleUsers = !this.toggleUsers;
    
  }
  orderByName(){
    this.users.sort((a: User, b:User)=>{
      if(a.full_name.toLowerCase() > b.full_name.toLowerCase()) {
        return 1;
      } else if(a.full_name.toLowerCase() < b.full_name.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    }) 
  }

  validar(senha, pass){
    if(senha === pass){
      console.log("meu deus mano");
    }else{
      console.log("meu deus mano de novo");
    }
  }

  
  
}
