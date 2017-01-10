import { Component } from '@angular/core';

@Component({
    selector: 'todo',          
    template: `<div class="col-md-12">
                    <h4>Todo List</h4>
                    <add-todo></add-todo><br/>
                    <todo-list></todo-list>                                  
                </div>`   
})

export class TodoComponent {}