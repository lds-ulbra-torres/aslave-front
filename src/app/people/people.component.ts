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
    
    
  }
  onDisplayPeople(){
    this.displayPeople = !this.displayPeople;
  }
  selectState(event: any){
    let id = event.target.value;
    console.log(id)
    this.getCities(id);
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
  getCities(id: number){
    console.log(id);
    this.peopleService.getCidade(id)
    .subscribe(cidades=>{
     
      this.cidades = [...cidades.body.obj]
      console.log(this.cidades)
      this.getByState(id);
      }
      );
  }

  getByState(id){
    return this.cidades.filter(c => c.id_states === id);
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

  updatePerson(p){
    const form = {
      "name": p.name,
      "cpf_cnpj": p.cpf_cnpj,
      "rg": `${p.rg}`,
      "adress": p.adress,
      "number": p.number,
      "neighborhood": p.neighborhood,
      "cep": p.cep,
      "phone1": p.phone1,
      "phone2": p.phone2,
      "id_cities": p.id_cities

    }
    this.peopleService.updatePeople(form, p.id_people).subscribe((response) =>{
      this.getPeople();
    })
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
