import { ManageService } from './manage.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  users: User[] = [];
  displayUser: boolean = true;

  constructor(private manageService: ManageService) { }


  ngOnInit() {
    this.manageService.getUsers().pipe(first()).subscribe(users =>{this.users = users});
  }
 
  onDisplayUser(){
    this.displayUser = !this.displayUser;
  }
}
