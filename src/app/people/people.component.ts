import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  personForm: FormGroup;
  displayPeople: boolean = false;
  displayNaturalPerson: boolean = true;
  displayLegalPerson: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      cpf_cnpj: ['', Validators.required],
      rg: [''],
      document: [''],
      adress: ['', Validators.required],
      neighbourhood: ['', Validators.required],
      number: ['', Validators.required],
      id_cities: [''],
      cep: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: ['']
    });
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
