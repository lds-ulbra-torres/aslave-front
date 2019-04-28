import { Observable } from 'rxjs';
import { Financial_releases } from './../models/financial_releases';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Classifications } from '../models/classifications';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient) { }
  private EntryUrl = 'http://api-teste-aslave-org-br.umbler.net/financial-releses';
  private ClassUrl = 'http://api-teste-aslave-org-br.umbler.net/financial-classifications';
  private peopleUrl = 'http://api-teste-aslave-org-br.umbler.net/people';
  
  getEntrys(): Observable<HttpResponse<any>>{
    return this.http.get<Financial_releases[]>(this.EntryUrl, { observe: 'response'});
  }

  getPeople(): Observable<HttpResponse<any>>{
    return this.http.get<Person[]>(this.peopleUrl, { observe: 'response'});
  }

  getClassifications(): Observable<HttpResponse<any>>{
    return this.http.get<Classifications[]>(this.ClassUrl, { observe: 'response'});
  }

  postEntrys(form){
    return this.http.post(this.EntryUrl, form);
  }

  delete(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.EntryUrl}/${id}`, { observe: 'response' });
  }

  updateEntry(Entry: any, id): Observable<any>{
    return this.http.put(`${this.EntryUrl}/${id}`, Entry);
  }
}
