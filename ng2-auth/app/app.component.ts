import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
                    <nav-bar></nav-bar>
                </nav>                    
                <div style="padding-top:60px;" class="container-fluid">
                    <app-content></app-content>
                </div>`,        
})

export class AppComponent {
    
}