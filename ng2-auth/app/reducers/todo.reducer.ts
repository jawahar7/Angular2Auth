import { List, fromJS } from 'immutable';
import { Action, Reducer } from 'redux';
import { Todo } from '../model/todo.model';

export const TodoReducer : Reducer<List<Todo>> = (state: List<Todo> = List<Todo>(), action: Action): List<Todo> => {
    switch(action.type) {
        case 'SET_TODO':
            return settodo(state, action);
        case 'ADD_TODO':
            return addtodo(state, action);
        case 'REMOVE_TODO':
            return removetodo(state, action);  
        case 'TOGGLE_TODO':   
            return toggletodo(state, action);                   
        default:
            return state;
    }
}

function settodo(state: List<Todo>, action) {
    const list: List<Todo> = action.payload.list;       
    return list;
}

function addtodo(state: List<Todo>, action) {    
    const todoobj: Todo = action.payload;  
    const list = fromJS(state);    
    return list.insert(list.count(), todoobj).toJS();
}

function removetodo(state: List<Todo>, action) {  
    const idx = state.findIndex(function(items){ return items.Id === action.payload.id});  
    var list = fromJS(state);   
    return list.deleteIn([idx]).toJS();
}

function toggletodo(state: List<Todo>, action) {   
    const idx = state.findIndex(function(items){ return items.Id === action.payload.id});    
    var list = fromJS(state);     
    return list.setIn([idx, 'Completed'], action.payload.completed).toJS();
}