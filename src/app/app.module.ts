import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { BasicInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { UploadComponent } from './upload';
// Used to upload files 
import { FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '@app/_services';
import { SignedURLService } from '@app/_services';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FileUploadModule
    ],

    declarations: [
        AppComponent,
        AlertComponent,
        UploadComponent
    ],

    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AccountService,
        SignedURLService,

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };