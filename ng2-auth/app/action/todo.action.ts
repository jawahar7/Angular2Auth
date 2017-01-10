import { List } from 'immutable';
import { Todo } from '../model/todo.model';

export function setTodo(list: List<Todo>){
    return {
        type: 'SET_TODO', payload: {list}
    }
}

export function addTodo(item: Todo) {
    return {
        type: 'ADD_TODO', payload: item
    }
}

export function removeTodo(id: number){
    return {
        type: 'REMOVE_TODO', payload: {id}
    }
}

export function toggleTodo(id: number, completed: boolean){
    return {
        type: 'TOGGLE_TODO', payload: {id, completed}
    }
}