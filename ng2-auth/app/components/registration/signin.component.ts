import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { NgRedux } from 'ng2-redux';
import { AppStore } from '../../model/appstore.model';
import { Alert } from '../../model/alert.model';
import { LoginModel } from '../../model/register.model';
import { AuthService } from '../../services/auth.service';
import * as AlertAction from '../../action/alert.action';

@Component({
    selector: 'sign-in',    
    templateUrl: '../../../template/registration/signin.html',    
    providers: [AuthService]    
})

export class SigninComponent implements OnInit, OnDestroy {
    public frmlogin: FormGroup;
    public submitted: boolean;
    showAlert: boolean = true;
    private alert$: Observable<List<Alert>>;
    constructor(private fb: FormBuilder, private router: Router, private ngRedux: NgRedux<AppStore>, private service: AuthService) {}

    ngOnInit() {             
        this.alert$ = this.ngRedux.select<List<Alert>>('alert');
        let currentuser = JSON.parse(localStorage.getItem('currentuser'));           
        if (currentuser) {
            this.router.navigate(['/Todo']);
        }                
        this.submitted = false;
        const emailregex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.frmlogin = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(emailregex)]],
            password: ['', [Validators.required]],            
        });             
    }

    closealert(id: string) {
        this.ngRedux.dispatch(AlertAction.removeAlert(id));
    }

    Login(model: LoginModel, isvalid: boolean) {    
        this.submitted = true;
        if(isvalid) {
            this.service.Login(model).subscribe(user=>{                
                if (user) {                    
                    localStorage.setItem('currentuser', JSON.stringify(user));   
                    this.router.navigate(['/Todo']);          
                }
            },
            error=>{
                let erroralert: Alert = {Message: error.status+" - "+error.statusText, Type: "danger"};   
                this.ngRedux.dispatch(AlertAction.addAlert(erroralert));         
            });
        }        
    }

    ngOnDestroy() {
        this.ngRedux.dispatch(AlertAction.removeAllAlert())
    }
}