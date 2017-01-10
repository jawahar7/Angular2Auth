import { List } from 'immutable';
import { Todo } from './todo.model';
import { Auth } from './auth.model';
import { Alert } from './alert.model';

export interface AppStore {
    todo?: List<Todo>;
    auth?: Auth;
    alert?: List<Alert>;
}