import { fromJS } from 'immutable';
import { Action, Reducer } from 'redux';
import { Auth } from '../model/auth.model';

export const AuthReducer : Reducer<Auth> = (state: Auth = {UserName:'', IsloggedIn: false}, action: Action): Auth => {
    switch(action.type) {
        case 'SET_USER':
            return setuser(state, action);                       
        default:
            return state;
    }
}

function setuser(state: Auth, action) {    
    return Object.assign({}, state, {UserName: action.payload.auth.UserName, IsloggedIn: action.payload.auth.IsloggedIn});
}