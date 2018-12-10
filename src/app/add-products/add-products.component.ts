import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ViewChild, ElementRef } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  @ViewChild('product') product: ElementRef;

  addCategory(){
    let productName = this.product.nativeElement.value;
 
    console.log(`${productName}`);
    
    let newProduct: any = {
      name: productName
    }

  }

  onSubmit(form){
    // console.log(form)

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .pipe(map(res => res))
    .subscribe(dados => {
      console.log(dados);
      
    });
  }

  constructor(
    private productsService: ProductsService,
    private http: HttpClient,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
