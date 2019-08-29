import { ProcurarPessoaNome } from '../../shared/pipes/procurar-name-financial-people.pipe';
import { ProcurarMovPipe } from '../../shared/pipes/procurar-mov-type.pipe';
import { PeopleComponent } from '../people/people.component';
import { Classifications } from '../../shared/models/classifications';
import { EntryService } from './entry.service';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Financial_releases } from '../../shared/models/financial_releases';
import { Component, OnInit } from '@angular/core';
import { Procurardate } from '../../shared/pipes/procurar-date-financial.pipe';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private entryService: EntryService, private toastr: ToastrService)  { }

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
  compDate: string;
  deleteDataEntry: string;

  error = '';
  sucess = '';

  people: PeopleComponent[];
  classification: Classifications[];
  options: string[] = [];
  isLoading: boolean = true;

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

  saveId(id){
    this.deleteDataEntry=id;
  }

  getEntry(){
    this.entryService.getEntrys().pipe(first())
    .subscribe(entrys =>{ this.entry = [... entrys.body.obj ],
      this.isLoading = false;
      this.orderByDate();
    });
  }

  orderByDate(){
    this.entry.sort(function compare(a, b) {
      var dateA = <any>new Date(a.due_date_pay);
      var dateB = <any>new Date(b.due_date_pay);
      return dateB - dateA;
    });
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
      this.toastr.success('Produto adicionado', 'Sucesso!',{
        timeOut: 5000
      });
    }, error => {
      this.error = error;
      this.toastr.error('Verifique os campos.', 'Falha no envio!', {
        timeOut: 5000
      });
    });
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
        this.toastr.success('Produto editado', 'Sucesso!',{
          timeOut: 5000
        });
      },error => {
        this.error = error;
        this.toastr.error('Verifique os campos.', 'Falha no envio!', {
          timeOut: 5000
        });
      });
  }

  deleteEntry(){
    this.entryService.delete(this.deleteDataEntry)
      .subscribe(
        resp => {
          this.deleteDataEntry = null
          this.getEntry();
          this.toastr.success('Produto Deletado', 'Sucesso!',{
            timeOut: 5000
          });
        }
      ),error => {
        this.error = error;
        this.toastr.warning('', 'Não foi possível deletar o produto.', {
          timeOut: 7000
        });
      };
  }

  possitiveValue(){
    let size = Object.keys(this.entry).length;
    let resultado=0;
    let dataSearched=(String(this.procurardata));

    if(!dataSearched || dataSearched === 'undefined'){
      for(let i=0;i<=size;i++){
        this.select(this.entry[i]);
        let valor=0;

        if(this.ent.type_mov === "e"){
          valor= this.ent.value;
          resultado+=valor;
        }
      }
    }

    for(let i=0;i<=size;i++){
      this.select(this.entry[i]);
      let valor=0;

      if(this.ent.type_mov === "e" && moment.utc(dataSearched).format("MM YYYY") === moment.utc(this.ent.due_date_pay).format("MM YYYY")){
        valor= this.ent.value;
        resultado+=valor;
      }
    }
    return resultado;
  }

  getPossitive(){
    let stringValue=this.possitiveValue();
    return stringValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  negativeValue(){
    let size = Object.keys(this.entry).length;
    let resultado=0;
    let dataSearched=(String(this.procurardata));

    if(!dataSearched || dataSearched === 'undefined'){
      for(let i=0;i<=size;i++){
        this.select(this.entry[i]);
        let valor=0;

        if(this.ent.type_mov === "s"){
          valor= this.ent.value;
          resultado+=valor;
        }
      }
    }

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

  getNegative(){
    let stringValue=this.negativeValue();
    return stringValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  balanceValue(){
    let possitiveValue = this.possitiveValue();
    let negativeValue = this.negativeValue();
    let resultValue = +possitiveValue - +negativeValue;

    return resultValue;
  }

  getBalance(){
    let stringValue=this.balanceValue();
    return stringValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

}
