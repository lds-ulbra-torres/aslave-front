import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { map } from 'rxjs/operators';

import { IStockInput } from '../../domain/IStockInput';

@Injectable()
export class StockPlacementService {

  constructor(private http: HttpClient) { }

  getPeople(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      'http://api-teste-aslave-org-br.umbler.net/people', { observe: 'response' });
  }

  postPerson(person): Observable<HttpResponse<any>> {
    return this.http.post('http://api-teste-aslave-org-br.umbler.net/people', person , { observe: 'response' });
  }

  postStockInput(stockInput): Observable<HttpResponse<any>> {
    return this.http.post('http://api-teste-aslave-org-br.umbler.net/stock-input', stockInput , { observe: 'response' });
  }

  postStockInput2(obj): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this.http.post('http://api-teste-aslave-org-br.umbler.net/stock-input', JSON.stringify(obj), { headers:httpHeaders, observe: 'response' })
  }

  getStockInputs(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      'http://api-teste-aslave-org-br.umbler.net/stock-input', { observe: 'response' });
  }

  
  getStockInputById(id): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      'http://api-teste-aslave-org-br.umbler.net/stock-input/'+id, { observe: 'response' });
  }

  getProducts(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      'http://api-teste-aslave-org-br.umbler.net/product ', { observe: 'response' });
  }

  deleteStockInput(id): Observable<HttpResponse<any>>{
    return this.http.delete('http://api-teste-aslave-org-br.umbler.net/stock-input/'+id, { observe: 'response' })
  }
}