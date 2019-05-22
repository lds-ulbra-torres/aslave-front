import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageService } from '../manage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private router: Router,
              private manageService: ManageService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit(u){
      let user = new FormData();
      user.append('full_name', u.value.full_name)
      user.append('login', u.value.login)
      user.append('password', u.value.password)
    
    
      this.manageService.postUsers(user).subscribe((response) => {
        u.reset();
        this.toastr.success('Adicionado com sucesso');

        this.router.navigate(['gerenciar']);
        console.log(response);
      }, error => {
        this.toastr.error('Não foi possível realizar a operação');
      })
    
  }

  goBack(){
    this.router.navigate(['gerenciar']);
  }

}
