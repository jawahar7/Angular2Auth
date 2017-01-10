import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import { NgReduxRouterModule, NgReduxRouter } from 'ng2-redux-router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './routeconfig/router';
import { createStore, Store } from 'redux';
import { RootReducer, InitialState } from './reducers/root.reducer';
//Components
import { AppComponent }  from './app.component';
import { NavbarComponent } from './components/header/navbar.component';
import { AppcontentComponent } from './components/appcontent.component';
import { SigninComponent } from './components/registration/signin.component';
import { SignupComponent } from './components/registration/signup.component';
import { TodoComponent } from './components/todo/todo.component';
import { AddTodoComponent } from './components/todo/addtodo.component';
import { TodoListComponent } from './components/todo/todolist.component';
//Service
import { AuthService } from './services/auth.service';
import { AuthGuard } from './routeconfig/route.resolve';
//Store
import { AppStore } from './model/appstore.model';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, routing, NgReduxModule, NgReduxRouterModule, NgbModule.forRoot()],
    declarations: [AppComponent, NavbarComponent, AppcontentComponent, SigninComponent, SignupComponent, TodoComponent, AddTodoComponent, TodoListComponent],
    providers: [AuthService, AuthGuard],
    bootstrap: [AppComponent]    
})

export class AppModule {    
    constructor(private ngRedux: NgRedux<AppStore>, ngReduxRouter: NgReduxRouter, private devTools: DevToolsExtension){        
        let enhancers = [];
        if (devTools.isEnabled()) {
            enhancers = [ ...enhancers, devTools.enhancer() ];
        }
        ngRedux.configureStore(RootReducer, InitialState, [], enhancers);
        ngReduxRouter.initialize();
    }
}