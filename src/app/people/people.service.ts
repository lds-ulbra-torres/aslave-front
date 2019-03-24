import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../models/estado';
import { Cidade } from '../models/cidade';
import { map } from 'rxjs/operators';
import { Person } from '../models/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }
  private peopleUrl = 'http://api-teste-aslave-org-br.umbler.net/people';

  getEstado(): Observable<HttpResponse<any>>{
    return this.http.get<any[]>('http://api-teste-aslave-org-br.umbler.net/states', {observe: 'response'});
  }

  getCidade(): Observable<HttpResponse<any>>{
    return this.http.get<any[]>('http://api-teste-aslave-org-br.umbler.net/cities', {observe: 'response'});
  }


  getPeople(): Observable<HttpResponse<any>>{
    return this.http.get<Person[]>(this.peopleUrl, { observe: 'response'});
  }
  getPeopleById(id): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${this.peopleUrl}/${id}`, { observe: 'response' });
  }
  updatePeople(person): Observable<any>{
    return this.http.put(this.peopleUrl, person);
  }
 
  deletePeople(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.peopleUrl}/${id}`, { observe: 'response' });
  }

  postPeople(form){
    return this.http.post(this.peopleUrl, form);
  }
}
