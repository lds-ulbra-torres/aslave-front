import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class StockRemovalService {

  constructor(private http:HttpClient) { }

  private stockOutUrl = 'http://api-teste-aslave-org-br.umbler.net/stock-output';
  private product = 'http://api-teste-aslave-org-br.umbler.net/product';

  getRemoval(): Observable<HttpResponse<any>>{
    return this.http.get<any[]>(this.stockOutUrl, { observe: 'response'});
  }
  getStockOutputById(id): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.stockOutUrl}/${id}`, { observe: 'response' });
  }
  getproductById(id): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.product}/${id}`, { observe: 'response' });
  }
  postOutput(form){
    return this.http.post(this.stockOutUrl, form);
  }
  deleteOutput(id){
    return this.http.delete(`${this.stockOutUrl}/${id}`, {observe: 'response'});
  }
}
