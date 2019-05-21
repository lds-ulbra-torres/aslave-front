import { PeopleService } from '../people/people.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
import { Person } from '../../shared/models/person';

@Injectable()
export class StockPlacementService {

  constructor(private http: HttpClient,
              private peopleService: PeopleService) { }

  private baseURL = 'http://api-teste-aslave-org-br.umbler.net';

  postStockInput(stockInput){
    return this.http.post(`${this.baseURL}/stock-input`, stockInput);
  }
  
  putStockInput(id, stockInput){
    return this.http.put(`${this.baseURL}/stock-input/${id}`, stockInput);
  }

  getProducts(): Observable<HttpResponse<any>>{
    return this.http.get<any[]>(`${this.baseURL}/product`, {observe: 'response'});
  }
  getInputs(): Observable<HttpResponse<any>>{
    return this.http.get<any[]>(`${this.baseURL}/stock-input`, {observe: 'response'});
  }
  getPeople(): Observable<HttpResponse<any>>{
    return this.http.get<Person[]>(`${this.baseURL}/people`, { observe: 'response'});
  }
  getStockInputById(id): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${this.baseURL}/stock-input/${id}`, { observe: 'response' });
  }

  deleteStockInput(id): Observable<HttpResponse<any>>{
    return this.http.delete(`${this.baseURL}/stock-input/${id}`, { observe: 'response' })
  }

}
