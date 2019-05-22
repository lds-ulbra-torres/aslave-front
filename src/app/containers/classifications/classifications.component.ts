import { Classifications } from './../models/classifications';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ClassificationsService } from './classifications.service';
import { ProcurarClassificationPipe } from '../pipes/procurar-classificacao.pipe';
import { ToastrService } from 'ngx-toastr';
import { OrdenarNomePipe } from '../pipes/ordenar-por-nome.pipe';

@Component({
  selector: 'app-classifications',
  templateUrl: './classifications.component.html',
  styleUrls: ['./classifications.component.css']
})
export class ClassificationsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private classificationService: ClassificationsService, private toastr: ToastrService) { }

  classification: Classifications[];
  class: Classifications;
  displayClassification: string;
  displayUpdate: string;
  display: boolean;
  displayUp: boolean;
  procuraClassification: ProcurarClassificationPipe;
  isLoading: boolean=true;
  radioResult: string;

  /*Variaveis de validação*/
  num_docValidation: boolean=false;
  type_validation: boolean=false;
  /**/

  error = '';
  sucess = '';

  ngOnInit() {
    this.getClassification();
  }

  getClassification(){
    this.classificationService.getClassifications().pipe(first())
    .subscribe(classifications =>{ this.classification = [... classifications.body.obj],
      this.isLoading = false; 
      this.orderByName();
    });
  }

  getSomeMoreClasses(value) {
    this.radioResult=value;
    console.log(this.radioResult);
    };

  onDisplayClassification(value){
    this.displayClassification = value;
  }

  onDisplay(){
    this.display = !this.display;
  }

  onDisplayUp(){
    this.displayUp = !this.displayUp;
  }

  onDisplayUpdate(value){
    this.displayUpdate = value;
  }

  select(C){
    this.getSomeMoreClasses(C.classifation_type);
    this.class = Object.assign({},C);
  }

  deleteClassification(){
    this.classificationService.delete(this.class.id_classification)
      .subscribe(
        resp => {
          this.getClassification();
          this.toastr.success('A classificação '+this.class.name_classification+' foi deletada!','',{
            timeOut: 5000
          });
          this.class = null;
        },error => {
          this.error = error;
          this.toastr.warning('', 'Você não pode excluir uma classificação que está em uso.', {
            timeOut: 7000
      });
    });
  }

  onSubmit(p){
    this.num_docValidation = false;
    this.type_validation = false;
    let numV = p.value.name;
    let typeV = this.displayClassification;

    if (numV=='') 
      this.num_docValidation = true;
      if (typeV=='')
      this.type_validation = true;  

    const classific = {
      'name_classification': p.value.name,
      'classifation_type': this.displayClassification
    };

    this.classificationService.postClassifications(classific).subscribe((response) => {
      p.reset();
      this.display = !this.display;
      this.getClassification();
      this.toastr.success('Classificação '+classific.name_classification+' adicionada', 'Sucesso!',{
        timeOut: 5000
      });
    }, error => {
      this.error = error;
      this.toastr.warning('Verifique os campos.', 'Falha no envio!', {
        timeOut: 5000
      });
    });  
  }

  orderByName(){
    this.classification.sort((a: Classifications, b:Classifications)=>{
      if(a.name_classification.toLowerCase() > b.name_classification.toLowerCase()) {
        return 1;
      } else if(a.name_classification.toLowerCase() < b.name_classification.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    }) 
  }  

  updateClassification(p){
    this.num_docValidation = false;
    this.type_validation = false;
    let numV = p.value.name;
    let typeV = this.displayClassification;

    if (numV=='') 
      this.num_docValidation = true;
      if (typeV=='')
      this.type_validation = true; 
      
    const classific = {
      'name_classification': p.value.name,
      'classifation_type': this.displayUpdate
    };

    this.classificationService.updateClassification(classific, this.class.id_classification)
    .subscribe(
      resp => {
        this.class = null;
        this.displayUp = !this.displayUp;
        this.getClassification();
        this.toastr.success('A classificação foi editada.', 'Sucesso!', {
          timeOut: 5000
        });
      }, error => {
        this.error = error;
        this.toastr.warning('Verifique os campos.', 'Falha no envio!', {
          timeOut: 5000
        });
      });  
  }
}
