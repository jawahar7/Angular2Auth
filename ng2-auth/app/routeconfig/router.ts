import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../components/registration/signin.component';
import { SignupComponent } from '../components/registration/signup.component';
import { TodoComponent } from '../components/todo/todo.component';
import { AuthGuard } from './route.resolve'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/SignIn',
    pathMatch: 'full'
  },
  {
    path: 'SignIn',
    component: SigninComponent
  },
  {
    path: 'Register',
    component: SignupComponent
  },
  {
    path: 'Todo',
    component: TodoComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(routes);