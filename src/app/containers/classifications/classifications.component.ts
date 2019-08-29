import { Classifications } from '../../shared/models/classifications';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ClassificationsService } from './classifications.service';
import { ProcurarClassificationPipe } from '../../shared/pipes/procurar-classificacao.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classifications',
  templateUrl: './classifications.component.html',
  styleUrls: ['./classifications.component.css']
})
export class ClassificationsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private classificationService: ClassificationsService, private toastr: ToastrService) { }

  classification: Classifications[];
  class: Classifications;
  procuraClassification: ProcurarClassificationPipe;
  isLoading: boolean=true;
  radioResult: string;

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

}
