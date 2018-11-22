import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  displayPeople: boolean = false;
  displayNaturalPerson: boolean = true;
  displayLegalPerson: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onDisplayPeople(){
    this.displayPeople = !this.displayPeople;
  }
  onDisplayNaturalPerson(){
    this.displayNaturalPerson = true;
    this.displayLegalPerson = false;
  }
  onDisplayLegalPerson(){
    this.displayLegalPerson = true;
    this.displayNaturalPerson = false;
  }

}
