import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { CategoriesService } from '../categories.service';





@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  
  @ViewChild('category') category: ElementRef;

  addCategory(){
    let categoryName = this.category.nativeElement.value;
 
    console.log(`${categoryName}`);
    
    let newCategory: any = {
      name: categoryName
    }

  }

  onSubmit(form){
    // console.log(form),
    
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .pipe(map(res => res))
    .subscribe(dados => {
      console.log(dados);
      
    });
  }
  
  
  constructor(
    private categoriesService: CategoriesService,    
    private http: HttpClient,    
    private location: Location,  
    ) { }
    
    ngOnInit() {
      // this.category = this.addCategory();
      
    }

  goBack(): void {
    this.location.back();
  }
}
