import { combineReducers } from 'redux';
import { routerReducer } from 'ng2-redux-router';
import { List } from 'immutable';
import { TodoReducer } from './todo.reducer';
import { AuthReducer } from './auth.reducer';
import { AlertReducer } from './alert.reducer';
import { AppStore } from '../model/appstore.model';
import { Todo } from '../model/todo.model';
import { Alert } from '../model/alert.model';

export const RootReducer = combineReducers<AppStore>({  
    router: routerReducer,
    todo: TodoReducer,
    auth: AuthReducer,
    alert: AlertReducer
});

export const InitialState = {todo: List<Todo>(), auth: {UserName:'', IsloggedIn: false}, alert: List<Alert>()};