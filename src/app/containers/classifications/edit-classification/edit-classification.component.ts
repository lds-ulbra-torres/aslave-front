import { Router, ActivatedRoute } from '@angular/router';
import { ClassificationsService } from './../classifications.service';
import { FormBuilder } from '@angular/forms';
import { Classifications } from './../../../shared/models/classifications';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-classification',
  templateUrl: './edit-classification.component.html',
  styleUrls: ['./edit-classification.component.css']
})
export class EditClassificationComponent implements OnInit {

  constructor(private Router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private classificationService: ClassificationsService, private toastr: ToastrService) { }

  classification: Classifications[];
  class: Classifications;
  displayClassification: string;
  displayUpdate: string;
  display: boolean;
  displayUp: boolean;
  isLoading: boolean=true;
  radioResult: string;
  editLoading: boolean;

  /*Variaveis de validação*/
  num_docValidation: boolean=false;
  type_validation: boolean=false;
  /**/

  id: null;
  sub: any;

  error = '';
  sucess = '';

  ngOnInit() {
    this.getById();
  }

  getSomeMoreClasses(value) {
    this.radioResult=value;
    };

  onDisplayClassification(value){
    this.displayClassification = value;
  }

  getById(){
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if(this.id){
      this.classificationService.getClassificationById(this.id).subscribe(
        resp =>{
          let inputCategory = resp.body.obj[0];
          this.class = inputCategory;
          this.getSomeMoreClasses(this.class.classifation_type);
        }
      )
    }
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
      'classifation_type': this.displayClassification
    };

    this.classificationService.updateClassification(classific, this.class.id_classification)
    .subscribe(
      resp => {
        this.class = null;
        this.displayUp = !this.displayUp;
        this.toastr.success('A classificação foi editada.', 'Sucesso!', {
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
