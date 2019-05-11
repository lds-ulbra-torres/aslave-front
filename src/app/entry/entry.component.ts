import { ProcurarPessoaNome } from './../pipes/procurar-name-financial-people.pipe';
import { ProcurarMovPipe } from './../pipes/procurar-mov-type.pipe';
import { PeopleComponent } from './../people/people.component';
import { Classifications } from './../models/classifications';
import { EntryService } from './entry.service';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Financial_releases } from './../models/financial_releases';
import { Component, OnInit } from '@angular/core';
import { Procurardate } from '../pipes/procurar-date-financial.pipe';
import * as moment from 'moment';

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
  options: string[] = [];

  /*Variaveis de validação*/
  num_docValidation: boolean=false;
  id_classificationV: boolean=false;
  peopleV: boolean=false;
  valorV: boolean=false;
  competenciaV: boolean=false;
  lancamentoV: boolean=false;
  historicoV: boolean=false;
  /**/

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
  }

  getEntry(){
    this.entryService.getEntrys().pipe(first())
    .subscribe(entrys =>{ this.entry = [... entrys.body.obj ] });
  }

  onSubmit(p){
    this.num_docValidation = false, this.id_classificationV = false, this.peopleV = false,
    this.valorV = false, this.competenciaV = false, this.lancamentoV = false, this.historicoV = false;
    let numV = p.value.num_doc;
    let typeV = p.value.id_classification;
    let peopleV = p.value.id_people;
    let valorV = p.value.valor;
    let competenciaV = p.value.competencia;
    let lancamentoV = p.value.lancamento;
    let historicoV = p.value.historico;

    if (numV=='') 
      this.num_docValidation = true;
    if (typeV=='')
      this.id_classificationV = true;
    if (peopleV=='')
      this.peopleV = true;
    if (valorV=='')
      this.valorV = true;
    if (competenciaV=='')
      this.competenciaV = true;
    if (lancamentoV=='')
      this.lancamentoV = true;
    if (historicoV=='')
      this.historicoV = true;
    
    if (this.num_docValidation || this.id_classificationV || this.peopleV || this.valorV || this.competenciaV || this.lancamentoV || this.historicoV)
    return false;  

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
    }, error => console.log(error))
  }

  updateClassification(p){
    this.num_docValidation = false, this.id_classificationV = false, this.peopleV = false,
    this.valorV = false, this.competenciaV = false, this.lancamentoV = false, this.historicoV = false;
    let numV = p.value.num_doc;
    let typeV = p.value.id_classification;
    let peopleV = p.value.id_people;
    let valorV = p.value.valor;
    let competenciaV = p.value.competencia;
    let lancamentoV = p.value.lancamento;
    let historicoV = p.value.historico;

    if (numV=='') 
      this.num_docValidation = true;
    if (typeV=='')
      this.id_classificationV = true;
    if (peopleV=='')
      this.peopleV = true;
    if (valorV=='' || valorV<=0)
      this.valorV = true;
    if (competenciaV=='')
      this.competenciaV = true;
    if (lancamentoV=='')
      this.lancamentoV = true;
    if (historicoV=='')
      this.historicoV = true;
    
    if (this.num_docValidation || this.id_classificationV || this.peopleV || this.valorV || this.competenciaV || this.lancamentoV || this.historicoV)
    return false;  

    let entry = new FormData();
    
    entry.append('id_people', p.value.id_people)
    entry.append('id_classification', p.value.id_classification)
    entry.append('type_mov', p.value.tipo)
    entry.append('num_doc', p.value.num_doc)
    entry.append('date_financial_release', p.value.lancamento)
    entry.append('value', p.value.valor)
    entry.append('due_date_pay', p.value.competencia)
    entry.append('historic', p.value.historico)

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

  possitiveValue(){
    let size = Object.keys(this.entry).length;
    let resultado=0;
    let dataSearched=(String(this.procurardata));

    for(let i=0;i<=size;i++){
      this.select(this.entry[i]);
      let valor=0;

      if(this.ent.type_mov === "e" && moment.utc(dataSearched).format("MM YYYY") === moment.utc(this.ent.due_date_pay).format("MM YYYY")){
        valor= this.ent.value;
        resultado+=valor;
        console.log("entrou no if");
      }else{
        console.log("entrou else")
      }
    }
    return resultado;
  }

  negativeValue(){
    let size = Object.keys(this.entry).length;
    let resultado=0;
    let dataSearched=(String(this.procurardata));

    for(let i=0;i<size;i++){
      this.select(this.entry[i]);
      let valor=0;
      if(this.ent.type_mov==="s" && moment.utc(dataSearched).format("MM YYYY")==moment.utc(this.ent.due_date_pay).format("MM YYYY")){
        valor= this.ent.value;
      }
      resultado+=valor;
    }
    return resultado;
  }

}
