
import { User } from '../../shared/models/user';
import { ManageService } from './manage.service';
import { Component, OnInit } from '@angular/core';

import { first, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { OrdenarNomePipe } from '../../shared/pipes/ordenar-por-nome.pipe';

import { ProcurarUserPipe } from '../../shared/pipes/procurar-user.pipe';
import { ToastrService } from 'ngx-toastr';

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
  

  constructor(private manageService: ManageService,
              private toastr: ToastrService) { }


  ngOnInit() {
    this.getUser();
  }

  updateUser(u){
    console.log(u);

    const user= {
      "login": u.login,
      "password": u.password,
      "full_name": u.full_name
    }
    this.manageService.updateUser(user, u).subscribe((response)=>{
      this.getUser();
      this.toastr.success('Editado com sucesso');
    }, error => {
      this.toastr.error('Não foi possível realizar a operação');
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
    
  }
  deleteUser(){
    this.manageService.deleteUser(this.user.id_user)
      .subscribe(
        resp => {
          this.user = null
          this.getUser();
          this.toastr.success('Deletado com sucesso');
        }
      ),
       (
         error =>{
           console.log(error);
           this.toastr.error('Não foi possível realizar a operação');
         }
      )
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
}
