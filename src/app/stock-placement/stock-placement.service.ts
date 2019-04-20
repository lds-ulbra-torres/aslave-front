import { PeopleService } from './../people/people.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable()
export class StockPlacementService {

  constructor(private http: HttpClient,
              private peopleService: PeopleService) { }

  private base = 'http://api-teste-aslave-org-br.umbler.net';

  
  getProducts(): Observable<HttpResponse<any>>{
    return this.http.get<any[]>('http://api-teste-aslave-org-br.umbler.net/product', {observe: 'response'});
  }
  getInputs(): Observable<HttpResponse<any>>{
    return this.http.get<any[]>('http://api-teste-aslave-org-br.umbler.net/stock-input', {observe: 'response'});
  }
  getPeople(): Observable<HttpResponse<any>>{
    return this.http.get<Person[]>('http://api-teste-aslave-org-br.umbler.net/people', { observe: 'response'});
  }
  getStockInputById(id): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      'http://api-teste-aslave-org-br.umbler.net/stock-input/'+id, { observe: 'response' });
  }

  deleteStockInput(id): Observable<HttpResponse<any>>{
    return this.http.delete('http://api-teste-aslave-org-br.umbler.net/stock-input/'+id, { observe: 'response' })
  }
}