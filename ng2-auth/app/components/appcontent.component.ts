import { Component } from '@angular/core';

@Component({
    selector: 'app-content',
    template: `<div class="row">                    
                    <router-outlet></router-outlet>
                </div>`
})

export class AppcontentComponent {}