import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private loginUrl = 'http://api-teste-aslave-org-br.umbler.net/auth';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<any>;
    public username: string;

    constructor(private http: HttpClient,
                private route: Router) {
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
                    localStorage.setItem('username', JSON.stringify(login));
                    this.currentUserSubject.next(user.obj);
                    this.username = login;
                    
                }
                
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('username');
        this.route.navigate(['../../login']);
        this.currentUserSubject.next(null);
    }
  
}
