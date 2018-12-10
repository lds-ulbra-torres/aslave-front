import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../models/categories';
import { CategoriesService } from '../categories.service';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
 
  categoryList: any

  constructor(   
    private categoriesService: CategoriesService,
    private http: HttpClient
  ) { }

  categorias: Categories[];
  

  ngOnInit() {

    this.categoryList = this.categoriesService.getAll()
    console.log(this.categoryList)
      
  }

}
