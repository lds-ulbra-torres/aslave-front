import { Router } from '@angular/router';
import { ClassificationsService } from './../classifications.service';
import { Classifications } from './../../../shared/models/classifications';
import { Component, OnInit } from '@angular/core';
import { ProcurarClassificationPipe } from 'src/app/shared/pipes/procurar-classificacao.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-classification',
  templateUrl: './add-classification.component.html',
  styleUrls: ['./add-classification.component.css']
})
export class AddClassificationComponent implements OnInit {

  constructor(private classificationService: ClassificationsService, private Router: Router, private toastr:ToastrService,) { }

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
  }

  getSomeMoreClasses(value) {
    this.radioResult=value;
    };

  onDisplayClassification(value){
    this.displayClassification = value;
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
      this.toastr.success('Classificação '+classific.name_classification+' adicionada', 'Sucesso!',{
        timeOut: 5000
      });
      this.goBack();
    }, error => {
      this.error = error;
      if(numV != '' && typeV != ''){
      this.toastr.warning('A classificação '+numV+' já existe', 'Falha no envio!', {
        timeOut: 5000
      });
    }else{
      this.toastr.error('Verifique os campos.', 'Falha no envio!', {
        timeOut: 5000
      });
    }
    });
  }
  
  goBack(){
    this.Router.navigate(['classificacoes']);
  }
}
