import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService } from '../people.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  constructor(private router: Router,
              private peopleService: PeopleService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  displayNaturalPerson: boolean = true;
  displayLegalPerson: boolean = false;
  cep: any;
  localidade: string;
  uf: string;

  toggleNaturalPerson(){
    this.displayNaturalPerson = !this.displayNaturalPerson;
    this.displayLegalPerson = false;
    
  }
  toggleLegalPerson(){
    this.displayLegalPerson = !this.displayLegalPerson;
    this.displayNaturalPerson = false;
  }
 
  getByZip(cep){
    let teste = cep.target.value;
    return this.peopleService.getByZipCode(teste).subscribe(res => {
      this.cep = res;
      this.localidade = this.cep.localidade;
      this.uf = this.cep.uf;

      console.log(this.cep)
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
    person.append('city', p.value.city)
    person.append('state', p.value.state)
    
    this.peopleService.postPeople(person).subscribe((response) => {
      p.reset();
      this.toastr.success('Adicionado com sucesso');
      this.router.navigate(['pessoas']);
     
    }, error => {
      console.log(error);
      this.toastr.error('Não foi possível realizar a operação');
    });
  }
  goBack(){
    this.router.navigate(['pessoas']);
  }

}
