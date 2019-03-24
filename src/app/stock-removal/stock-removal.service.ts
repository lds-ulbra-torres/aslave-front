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

  getRemoval(): Observable<HttpResponse<any>>{
    return this.http.get<any[]>(this.stockOutUrl, { observe: 'response'});
  }
}
