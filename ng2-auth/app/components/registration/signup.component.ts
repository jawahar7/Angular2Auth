import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppStore } from '../../model/appstore.model';
import { Alert } from '../../model/alert.model';
import { RegisterModel } from '../../model/register.model';
import { AuthService } from '../../services/auth.service';
import * as AlertAction from '../../action/alert.action';

@Component({
    selector: 'sign-in',
    templateUrl: '../../../template/registration/signup.html',
    providers: [AuthService]
})

export class SignupComponent implements OnInit {
    public frmregister: FormGroup;
    public submitted: boolean;
    constructor(private ngRedux: NgRedux<AppStore>, private fb: FormBuilder, private router: Router, private authservice: AuthService) { }

    ngOnInit() {
        this.submitted = false;
        const emailregex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.frmregister = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(emailregex)]],
            password: ['', [Validators.required]],
            repassword: ['', [Validators.required]]
        }, {validator: this.matchingPasswords('password', 'repassword')});
    }

    matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey];
            let passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
            return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
        }
    }

    Register(model: RegisterModel, isvalid: boolean) {    
        this.submitted = true;        
        if(isvalid) {
            let obj = {Name:model.name, Email:model.email, Password:model.password};            
            this.authservice.Register(obj).subscribe(success=>{
                if(success) {
                    let alert:Alert = {Message: "Inserted Successfully",Type: "success"};
                    this.ngRedux.dispatch(AlertAction.addAlert(alert));
                    this.router.navigate(['/SignIn']);
                }
            },error=>{
                console.log(error)
            });
        }        
    }
}