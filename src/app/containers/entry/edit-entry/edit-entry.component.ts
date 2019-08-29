import { Classifications } from './../../../shared/models/classifications';
import { Financial_releases } from './../../../shared/models/financial_releases';
import { EntryService } from './../entry.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PeopleComponent } from '../../people/people.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent implements OnInit {

  constructor(private Router: Router, private entryService: EntryService, private toastr: ToastrService,
    private route: ActivatedRoute,) { }

  entry: Financial_releases[];
  ent: Financial_releases;
  peo: PeopleComponent;
  compDate: string;
  deleteDataEntry: string;

  error = '';
  sucess = '';

  people: PeopleComponent[];
  classification: Classifications[];
  options: string[] = [];
  isLoading: boolean = true;
  id: null;
  sub: any;

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
    this.getClassification();
    this.getPeople();
    this.getById();
  }

  getById(){
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if(this.id){
      this.entryService.getEntryById(this.id).subscribe(
        resp =>{
          let inputCategory = resp.body.obj[0];
          this.ent = inputCategory;  
        }
      )
    }
  }

  getClassification(){
    this.entryService.getClassifications().pipe(first())
    .subscribe(classifications =>{ this.classification = [... classifications.body.obj] });
  }

  getPeople(){
    this.entryService.getPeople().pipe(first())
    .subscribe(people =>{ this.people = [... people.body.obj] });
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
        this.goBack();
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

  goBack(){
    this.Router.navigate(['lancamentos']);
  }
}
