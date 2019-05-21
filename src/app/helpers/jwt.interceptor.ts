import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../containers/login/login.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this)
        let currentUser = this.loginService.currentUserValue;
        if (currentUser && currentUser.token) {
            if(request.url.search("viacep")=== -1){
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                 });
            }
            
        }

        return next.handle(request);
    }
}