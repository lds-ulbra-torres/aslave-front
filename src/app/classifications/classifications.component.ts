import { Classifications } from './../models/classifications';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassificationsService } from './classifications.service';

@Component({
  selector: 'app-classifications',
  templateUrl: './classifications.component.html',
  styleUrls: ['./classifications.component.css']
})
export class ClassificationsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private classificationService: ClassificationsService) { }

  classification: Classifications[];
  class: Classifications;
  displayClassification: boolean = false;

  ngOnInit() {
    this.getClassification();
  }

  getClassification(){
    this.classificationService.getClassifications().pipe(first())
    .subscribe(classifications =>{ this.classification = [... classifications.body.obj] });
  }

  onDisplayClassification(){
    this.displayClassification = !this.displayClassification;
  }

  select(C){
    this.class = Object.assign({},C);
    console.log(C);
    console.log(this.class);
  }

  deleteClassification(){
    this.classificationService.delete(this.class.id_classification)
      .subscribe(
        resp => {
          this.class = null;
          this.getClassification();
        }
      ),
       (
         error => console.log(error)
      )
  }

  onSubmit(p){
    console.log(p.value);
    
    let classific = new FormData();
    
    classific.append('name_classification', p.value.name_classification);
    classific.append('classifation_type', p.value.classifation_type);

    console.log(classific);

    this.classificationService.postClassifications(classific).subscribe((response) => {
      p.reset();
      this.getClassification();
      this.displayClassification = !this.displayClassification;
      console.log(response);
    }, error => console.log(error))
  }
}
