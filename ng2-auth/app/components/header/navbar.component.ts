import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppStore } from '../../model/appstore.model';
import { Auth } from '../../model/auth.model';
import * as AuthAction from '../../action/auth.action';

@Component({
    selector: 'nav-bar',
    styles: [`.navtoggle{display:block}
                :host {display: block; width: 100%; }`],
    templateUrl: '../template/header/navbar.html'
})

export class NavbarComponent implements OnInit {
    private auth$: Observable<Auth>;
    navbartoggle: boolean;
    constructor(private ngRedux: NgRedux<AppStore>, private router: Router){        
        this.navbartoggle = false;
    }

    ngOnInit(){
        this.auth$ = this.ngRedux.select<Auth>('auth');
    }

    navbartoggleclick() {        
        this.navbartoggle = !this.navbartoggle;
    }

    logout() {
        localStorage.removeItem("currentuser");
        const auth:Auth = {UserName: "", IsloggedIn: false};
        this.ngRedux.dispatch(AuthAction.setUser(auth));
        this.navbartoggle = false;
        this.router.navigate(['/SignIn']);
    }
}