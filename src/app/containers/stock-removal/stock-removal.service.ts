import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './../../config';

@Injectable({
  providedIn: 'root'
})
export class StockRemovalService {

  constructor(private http:HttpClient) { }

  private stockOutUrl = baseUrl+'stock-output';
  private product = baseUrl+'product';

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
  updateOutput(form, id): Observable<any>{
    return this.http.put(`${this.stockOutUrl}/${id}`, form, { observe: 'response' });
  }
  deleteOutput(id){
    return this.http.delete(`${this.stockOutUrl}/${id}`, {observe: 'response'});
  }
}
