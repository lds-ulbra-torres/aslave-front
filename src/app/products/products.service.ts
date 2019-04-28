import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product'
import { Categorias } from './../models/categories';

@Injectable({
  providedIn: 'root'
})
export class productsService {

  constructor(private http: HttpClient) { }

  private produtoURL = 'http://api-teste-aslave-org-br.umbler.net/product';
  private categoriesURL = 'http://api-teste-aslave-org-br.umbler.net/category';
 

  postProduct(form){
    return this.http.post(this.produtoURL, form);
  }

  getProdutoServ(): Observable<HttpResponse<any>>{
    return this.http.get<Product[]>(this.produtoURL, { observe: 'response'});
  }

  deleteProduct(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.produtoURL}/${id}`, { observe: 'response' });
  }

  getProductServ(): Observable<HttpResponse<any>>{
    return this.http.get<Categorias[]>(this.categoriesURL, { observe: 'response'});
  }

  updateProduct(Product: any, id): Observable<any>{
    console.log(Product);
    console.log(id);
    
    return this.http.put(`${this.produtoURL}/${id}`, Product);
  }

}