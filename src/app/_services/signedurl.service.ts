import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { SignedURL } from '@app/_models';

@Injectable({ providedIn: 'root'})
export class SignedURLService {

    constructor(
        private http: HttpClient
    ){}

    getSignedURL(username, modelname) {
        return this.http.get<SignedURL>(`${environment.apiUrl}/cadmodels/signedurl?` + 'username=' + encodeURI(username) + '&modelname=' + encodeURI(modelname) + '&action=write')
            .pipe(map(data => {
                return data;
            }));
    }
}