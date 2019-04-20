import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Estado } from '../models/estado';
import { Cidade } from '../models/cidade';
import { PeopleService } from './people.service';
import { Person } from '../models/person';
import { ProcurarPessoaPipe } from '../pipes/procurar-pessoa.pipe';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  personForm: FormGroup;
  id: number;
  cep: string = "95625000";
  object: Object;

  constructor(private formBuilder: FormBuilder, private peopleService: PeopleService) { }
  
  estados: any[];
  cidades: any[];
  people: Person[];
  procuraPerson: ProcurarPessoaPipe;
  person: Person;
  displayPeople: boolean = false;
  displayNaturalPerson: boolean = true;
  displayLegalPerson: boolean = false;
  isLoading: boolean = true;

  ngOnInit() {
    this.getPeople();
    this.getEstados();
    this.getByCep();
    this.getCities(23);
  }
  onDisplayPeople(){
    this.displayPeople = !this.displayPeople;
  }
  getPeople(){
    this.peopleService.getPeople().pipe(first())
    .subscribe(people =>{ this.people = [... people.body.obj]
      this.isLoading = false;
    });
  }
  getEstados(){
    this.peopleService.getEstado().pipe(first())
    .subscribe(estados =>{ this.estados = [... estados.body.obj] });
  }
  getCities(id){
    
    this.peopleService.getCidade(id).pipe(first())
    .subscribe(cidades=>{this.cidades = [...cidades.body.obj]});
  }
  getByCep(){
    this.peopleService.getByZip(this.cep).pipe(first()).subscribe(data=> {
      this.object = data
      console.log(data)
    });   
  }

  onSubmit(p){
    console.log(p);
    let person = new FormData();
    
    person.append('name', p.value.name)
    person.append('cpf_cnpj', p.value.cpf_cnpj)
    person.append('documment', p.value.documment)
    person.append('rg', `${p.value.rg}`)
    person.append('adress', p.value.adress)
    person.append('number', p.value.number)
    person.append('neighborhood', p.value.neighborhood)
    person.append('cep', p.value.cep)
    person.append('phone1', p.value.phone1)
    person.append('phone2', p.value.phone2)
    person.append('id_cities', p.value.id_cities)
    
    this.peopleService.postPeople(person).subscribe((response) => {
      p.reset();
      this.getPeople();
      this.displayPeople = !this.displayPeople;
      console.log(response);
    }, error => console.log(error))

  }
  select(p){
    this.person = Object.assign({}, p);
  }

  deletePerson(){
    this.peopleService.deletePeople(this.person.id_people)
      .subscribe(
        resp => {
          this.person = null
          this.getPeople();
        }
      ),
       (
         error => console.log(error)
      )
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
