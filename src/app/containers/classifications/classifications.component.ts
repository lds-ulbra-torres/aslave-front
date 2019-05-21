import { Classifications } from '../../models/classifications';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ClassificationsService } from '../../classifications/classifications.service';
import { ProcurarClassificationPipe } from '../../pipes/procurar-classificacao.pipe';

@Component({
  selector: 'app-classifications',
  templateUrl: './classifications.component.html',
  styleUrls: ['./classifications.component.css']
})
export class ClassificationsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private classificationService: ClassificationsService) { }

  classification: Classifications[];
  class: Classifications;
  displayClassification: string;
  displayUpdate: string;
  display: boolean;
  displayUp: boolean;
  procuraClassification: ProcurarClassificationPipe;

  ngOnInit() {
    this.getClassification();
  }

  getClassification(){
    this.classificationService.getClassifications().pipe(first())
    .subscribe(classifications =>{ this.classification = [... classifications.body.obj] });
  }

  onDisplayClassification(value = 'e'){
    this.displayClassification = value;
    console.log(value);
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

  select(C){
    this.class = Object.assign({},C);
  }

  deleteClassification(){
    this.classificationService.delete(this.class.id_classification)
      .subscribe(
        resp => {
          this.class = null
          this.getClassification();
        }
      ),
       (
         error => console.log(error)
      )
  }

  onSubmit(p){
    const classific = {
      'name_classification': p.value.name,
      'classifation_type': this.displayClassification
    };
    console.log(classific);

    this.classificationService.postClassifications(classific).subscribe((response) => {
      p.reset();
      this.display = !this.display;
      this.getClassification();
      console.log(response);
    }, error => console.log(error))
  }

  updateClassification(p){
    const classific = {
      'name_classification': p.value.name,
      'classifation_type': this.displayUpdate
    };

    console.log(classific)
    this.classificationService.updateClassification(classific, this.class.id_classification)
    .subscribe(
      resp => {
        this.class = null;
        this.displayUp = !this.displayUp;
        this.getClassification();
      }
    );
  }
}
