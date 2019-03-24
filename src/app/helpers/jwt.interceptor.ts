import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this)
        let currentUser = this.loginService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
    /*
        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = <any> this.loginService.currentUserValue;
        if (currentUser && currentUser.obj.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.obj.token}`
                }
            });
        }

        return next.handle(request);
    }
    */
}