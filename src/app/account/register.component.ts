import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// Md5 hashing
import { Md5 } from 'ts-md5/dist/md5';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    public barLabel: string = "Password strength:";  
    public passIsNotStrong: boolean = true;  

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    public setPassStrength(isNotStrong: boolean):void {
        this.passIsNotStrong = isNotStrong;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            emailAddress: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid && this.passIsNotStrong) {
            return;
        }

        const hashedPassword = Md5.hashStr(this.form.value.password);
        this.form.value.password = hashedPassword;

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}