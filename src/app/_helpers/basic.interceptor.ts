import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AccountService } from '@app/_services';

@Injectable()
export class BasicInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with the basic token if user is logged in and request is to the api url with path '/cadmodels/'
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        const isCadmodelEndpoint = request.url.includes('/cadmodels/');
        if (isLoggedIn && isApiUrl && isCadmodelEndpoint) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${user.token}`
                }
            });
        }
        return next.handle(request);
    }
}