import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  displayUser: boolean = true;
  constructor() { }


  ngOnInit() {
  }

  onDisplayUser(){
    this.displayUser = !this.displayUser;
  }
}
