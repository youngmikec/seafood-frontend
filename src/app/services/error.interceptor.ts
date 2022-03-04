import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { safeGet } from '../helpers';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || err.status === 403) {
                // auto logout if 401 or 403 response returned from api
                this.authService.userLogOut();
                // location.reload(true);
            }
            const error = safeGet(err.error, 'message') || err.statusText;
            return throwError(error);
        }));
    }
}
