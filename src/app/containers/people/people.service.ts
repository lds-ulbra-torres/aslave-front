import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../../shared/models/estado';
import { Cidade } from '../../shared/models/cidade';
import { map } from 'rxjs/operators';
import { Person } from '../../shared/models/person';
import { Observable } from 'rxjs';
import { baseUrl } from './../../config';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }
  private peopleUrl = baseUrl+'people';

  cities: Observable<any>

  getByZipCode(cep): Observable<HttpResponse<any>>{
    let headers = new Headers();
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  getPeople(): Observable<HttpResponse<any>>{
    return this.http.get<Person[]>(`${this.peopleUrl}`, { observe: 'response'});
  }

  getEstado(){
    return true;
  }

  getPeopleById(id): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${this.peopleUrl}/${id}`, { observe: 'response' });
  }
  updatePeople(person, id): Observable<any>{
    return this.http.put(`${this.peopleUrl}/${id}`, person, {observe: 'response'});
  }
 
  deletePeople(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.peopleUrl}/${id}`, { observe: 'response' });
  }

  postPeople(form){
    return this.http.post(`${this.peopleUrl}`, form);
  }
}
