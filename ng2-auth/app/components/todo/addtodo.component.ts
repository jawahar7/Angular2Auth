import { Component, EventEmitter } from "@angular/core";
import { NgRedux } from 'ng2-redux';
import { AppStore } from '../../model/appstore.model';
import * as TodoAction from '../../action/todo.action';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'add-todo',
    providers: [TodoService],
    template: `<div class="form-inline">
                    <div class="form-group">
                        <label>Todo:</label>
                        <input type="text" [(ngModel)]="todo" class="form-control" />
                        <input type="button" (click)="AddTodo(todo)" class="btn btn-default" value="Add Todo" />
                    </div>
                </div>`                                    
})

export class AddTodoComponent{    
    todo:string;
    constructor(private ngRedux: NgRedux<AppStore>, private todoservice: TodoService){}     
    AddTodo(value:string) {
        this.todoservice.AddTodo({Name: value, Completed: false}).subscribe(t=>this.ngRedux.dispatch(TodoAction.addTodo(t)));        
        this.todo = "";             
    }
}
