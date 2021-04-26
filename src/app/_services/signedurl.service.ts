import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { SignedURL } from '@app/_models';

@Injectable({ providedIn: 'root'})
export class SignedURLService {
    //public cadDetails: Observable<SignedURL>;

    constructor(
        private router: Router,
        private http: HttpClient
    ){}

    getSignedURL(username, modelname) {
        return this.http.put<SignedURL>(`${environment.apiUrl}/cadmodels/signedurl`, { username, modelname })
            .pipe(map(data => {
                return data;
            }));
    }
    
}