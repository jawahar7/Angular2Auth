import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { NgRedux } from 'ng2-redux';
import { Todo } from '../../model/todo.model';
import { AppStore } from '../../model/appstore.model';
import { TodoService } from '../../services/todo.service';
import * as TodoAction from '../../action/todo.action';

@Component({
    selector: 'todo-list',   
    providers: [TodoService],
    inputs: ['todoitem'],     
    templateUrl: '../../../template/todo/todolist.html',    
    styles: [`a{cursor:pointer;}
               .complete{text-decoration:line-through;} `]                 
})

export class TodoListComponent implements OnInit {
    private todo$: Observable<List<Todo>>;  
    constructor(private ngRedux: NgRedux<AppStore>, private todoservice: TodoService) {        
    }   
    
    ngOnInit(){           
        this.todo$ = this.ngRedux.select<List<Todo>>('todo');
        this.todoservice.GetTodo().subscribe(t => this.ngRedux.dispatch(TodoAction.setTodo(t)));
    }

    deletetodo(id :number) {        
       this.todoservice.DeleteTodo(id).subscribe(x => {
            if(x.Status == 0){
                this.ngRedux.dispatch(TodoAction.removeTodo(id));
            }
        },error => {
            console.log(error);
        });  
    }

    toggletodo(todo: Todo) {  
        //todo.Completed = !todo.Completed; 
        const temptodo: Todo = {Id: todo.Id, Completed: !todo.Completed, Name: todo.Name}  
        this.todoservice.UpdateTodo(temptodo).subscribe(x => {            
            this.ngRedux.dispatch(TodoAction.toggleTodo(x.Id, x.Completed))
        },error => {
            console.log(error);
        });    
    }
}