import { ProcurarPessoaNome } from './../pipes/procurar-name-financial-people.pipe';
import { ProcurarMovPipe } from './../pipes/procurar-mov-type.pipe';
import { PeopleComponent } from './../people/people.component';
import { Classifications } from './../models/classifications';
import { EntryService } from './entry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Financial_releases } from './../models/financial_releases';
import { Component, OnInit } from '@angular/core';
import { Procurardate } from '../pipes/procurar-date-financial.pipe';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private entryService: EntryService)  { }

  entry: Financial_releases[];
  ent: Financial_releases;
  peo: PeopleComponent;
  displayEntry: string;
  displayUpdate: string;
  display: boolean;
  displayUp: boolean;
  procurarmov: ProcurarMovPipe;
  procurardata: Procurardate;
  procurarNome: ProcurarPessoaNome;

  people: PeopleComponent[];
  classification: Classifications[];

  ngOnInit() {
    
    this.getEntry();
    this.getClassification();
    this.getPeople();
  }

  getClassification(){
    this.entryService.getClassifications().pipe(first())
    .subscribe(classifications =>{ this.classification = [... classifications.body.obj] });
  }

  getPeople(){
    this.entryService.getPeople().pipe(first())
    .subscribe(people =>{ this.people = [... people.body.obj] });
  }

  onDisplay(){
    this.display = !this.display;
  }

  onDisplayUp(){
    this.displayUp = !this.displayUp;
  }

  onDisplayUpdate(value = 'e'){
    this.displayUpdate = value;
  }

  onDisplayClassification(value = 'e'){
    this.displayEntry = value;
  }

  select(C){
    this.ent = Object.assign({},C);
    console.log(this.ent)
  }

  getEntry(){
    this.entryService.getEntrys().pipe(first())
    .subscribe(entrys =>{ this.entry = [... entrys.body.obj ] });
    console.log(this.entry)
  }

  onSubmit(p){
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
    console.log(p.value);
    let entry = new FormData();
    
    entry.append('id_people', p.value.id_people)
    entry.append('id_classification', p.value.id_classification)
    entry.append('type_mov', p.value.tipo)
    entry.append('num_doc', p.value.num_doc)
    entry.append('date_financial_release', p.value.lancamento)
    entry.append('value', p.value.valor)
    entry.append('due_date_pay', p.value.competencia)
    entry.append('historic', p.value.historico)

    this.entryService.postEntrys(entry).subscribe((response) => {
      p.reset();
      this.display = !this.display;
      this.getEntry();
      console.log(response);
    }, error => console.log(error))
  }

  updateClassification(p){
    let entry = new FormData();
    console.log(p.value.lancamento)
    console.log(p.value.competencia)
    
    entry.append('id_people', p.value.id_people)
    entry.append('id_classification', p.value.id_classification)
    entry.append('type_mov', p.value.tipo)
    entry.append('num_doc', p.value.num_doc)
    entry.append('date_financial_release', p.value.lancamento)
    entry.append('value', p.value.valor)
    entry.append('due_date_pay', p.value.competencia)
    entry.append('historic', p.value.historico)

    console.log(p.value)
    this.entryService.updateEntry(entry, this.ent.id_financial_release)
    .subscribe(
      resp => {
        this.ent = null;
        this.displayUp = !this.displayUp;
        this.getEntry();
      }
    );
  }

  deleteEntry(){
    this.entryService.delete(this.ent.id_financial_release)
      .subscribe(
        resp => {
          this.ent = null
          this.getEntry();
        }
      ),
       (
         error => console.log(error)
      )
  }

}
