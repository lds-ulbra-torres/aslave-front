import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ManageService {

  private usersUrl = 'http://api-teste-aslave-org-br.umbler.net/user'
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.usersUrl);
  }
}
