import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsList: any[] = [
    {name: "Produto Um", cpf: "9348279827", estoque:"4932879"},
    {name: "Produto Dois", cpf: "43787436", estoque:"847632"},
  ];

  addCategory(product){
    this.productsList.push(product);
  }

  getAll(){
    return this.productsList;
  }
  
  constructor(
    private http: HttpClient
  ) { }

  
  url = '';

  getCategories(): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.url, {observe: 'response'})
    // .pipe(map((res: Response) => res.json()))
  }
}
