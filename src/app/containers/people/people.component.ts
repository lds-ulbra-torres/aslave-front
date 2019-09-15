import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Estado } from '../../shared/models/estado';
import { Cidade } from '../../shared/models/cidade';
import { PeopleService } from './people.service';
import { Person } from '../../shared/models/person';
import { ProcurarPessoaPipe } from '../../shared/pipes/procurar-pessoa.pipe';
import { ToastrService } from 'ngx-toastr';

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
  doc: string = "";
  constructor(private formBuilder: FormBuilder, private peopleService: PeopleService,
              private toastr: ToastrService) { }


  people: Person[];
  procuraPerson: ProcurarPessoaPipe;
  person: Person;
  isLoading: boolean = true;

  ngOnInit() {
    this.getPeople();
  }

  getPeople(){
    this.peopleService.getPeople().pipe(first())
    .subscribe(people =>{ this.people = [... people.body.obj]

      this.isLoading = false;
    });
  }


  select(p){
    this.person = Object.assign({}, p);
    if(this.person.documment === "undefined"){
      this.person.documment = this.doc;
    }
  }

  change(doc){
    if(doc === "undefined"){
      doc = "";
    }
    return doc;
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
      "city": p.city,
      "state": p.state

    }
    this.peopleService.updatePeople(form, p.id_people).subscribe((response) =>{
      this.getPeople();
      this.toastr.success('Editado com sucesso');
    }, error => {
      this.toastr.error('Não foi possível realizar a operação');
    })
  }
  deletePerson(){
    this.peopleService.deletePeople(this.person.id_people)
      .subscribe(
        resp => {
          this.toastr.success('Deletado com sucesso');
          this.person = null
          this.getPeople();

        }
      ),
       (
         error =>{
          this.toastr.error('Não foi possível realizar a operação');
        }
      )
  }



}
