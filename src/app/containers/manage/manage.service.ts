import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs';
import { baseUrl } from './../../config';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  private usersUrl = baseUrl+'user'
  constructor(private http: HttpClient) { }

  getUsers(): Observable<HttpResponse<any>> {
    return this.http.get<User[]>(this.usersUrl, { observe: 'response'});
  }

  postUsers(form){
    return this.http.post(this.usersUrl, form);
  }

  updateUser(user, u): Observable<HttpResponse<any>>{
    return this.http.put(`${this.usersUrl}/${u.id_user}`, user, { observe: 'response'});
  }

  deleteUser(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.usersUrl}/${id}`, { observe: 'response' });
  }
}
