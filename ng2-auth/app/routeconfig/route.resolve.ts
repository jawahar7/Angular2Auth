import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AppStore } from '../model/appstore.model';
import { Auth } from '../model/auth.model';
import * as AuthAction from '../action/auth.action';
import 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private service: AuthService, private ngRedux: NgRedux<AppStore>) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|boolean {            
        return this.service.IsAuthenticated().map(e => {
            if (e) {    
                const obj = e.json();
                const auth:Auth = {UserName: obj.userdetail.username,IsloggedIn: true};   
                this.ngRedux.dispatch(AuthAction.setUser(auth));
                return true;
            }        
         }).catch((error) => {
             const auth:Auth = {UserName: "", IsloggedIn: false};
             this.ngRedux.dispatch(AuthAction.setUser(auth));
             localStorage.removeItem("currentuser");
             this.router.navigate(['/SignIn']);
             return Observable.of(false);
         });              
    }
}