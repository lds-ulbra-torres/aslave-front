import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ManageService {

  private usersUrl = 'http://api-teste-aslave-org-br.umbler.net/user'
  constructor(private http: HttpClient) { }

  getUsers(): Observable<HttpResponse<any>> {
    return this.http.get<User[]>(this.usersUrl, { observe: 'response'});
  }

  postUsers(form){
    return this.http.post(this.usersUrl, form);
  }

  updateUser(user, id): Observable<HttpResponse<any>>{
    return this.http.put(`${this.usersUrl}/${id}`, user, { observe: 'response'});
  }
 
  deleteUser(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.usersUrl}/${id}`, { observe: 'response' });
  }
}
