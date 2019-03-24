import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private loginUrl = 'http://api-teste-aslave-org-br.umbler.net/auth';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<any>;
    public user: string;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(login: string, password: string) {
        return this.http.post<any>(this.loginUrl, { login, password })
            .pipe(map(user => {
                
                if (user && user.obj.token) {
                    
                    localStorage.setItem('currentUser', JSON.stringify(user.obj));
                    this.currentUserSubject.next(user.obj);
                    
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
  
}
