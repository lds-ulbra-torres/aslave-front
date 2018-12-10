import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CategoriesService } from '../categories.service';
import { ProductsService } from '../products.service';
// import { HttpClient } from 'selenium-webdriver/http';
import { Products } from '../models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  productsList: any

  constructor(
    // private http: HttpClient,
    private productsService: ProductsService,
  ) { }

  products : Products[];
 

  ngOnInit() {

    this.productsList = this.productsService.getAll()
    console.log(this.productsList)
      
  }

}
