import { List, fromJS } from 'immutable';
import { Action, Reducer } from 'redux';
import { UUID } from 'angular2-uuid';
import { Alert } from '../model/alert.model';

export const AlertReducer : Reducer<List<Alert>> = (state: List<Alert> = List<Alert>(), action: Action): List<Alert> => {
    switch(action.type) {
        case 'ADD_ALERT':
            return addalert(state, action);
        case 'REMOVE_ALERT':
            return removealert(state, action);
        case 'REMOVE_ALL_ALERT':
            return removeallalert(state, action);                  
        default:
            return state;
    }
}

function addalert(state: List<Alert>, action) {    
    const todoobj: Alert = action.payload;  
    todoobj.Id = UUID.UUID();    
    return state.push(todoobj);
}

function removealert(state: List<Alert>, action) {      
    const idx = state.findIndex(function(items){ return items.Id === action.payload.id});        
    return state.delete(idx);;
}

function removeallalert(state: List<Alert>, action) {         
    return state.clear();
}