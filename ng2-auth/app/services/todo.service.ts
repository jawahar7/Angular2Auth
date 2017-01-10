import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Todo } from '../model/todo.model';

@Injectable()
export class TodoService {
    private todourl = 'http://localhost/TokenApi/api/Todo';    
    constructor(private http: Http){}
    GetTodo() {        
        return this.http.get(this.todourl, this.GetToken())
            .map((response:Response) => response.json());          
    }

    AddTodo(todoobj: Todo) {                  
        return this.http.post(this.todourl, JSON.stringify(todoobj), this.GetToken())
            .map((response:Response) => response.json());
    }

    DeleteTodo(id: number) {                
        return this.http.delete(this.todourl+'/'+id, this.GetToken())
            .map((response:Response) => response.json());
    }

    UpdateTodo(todoobj: Todo) {                
        return this.http.put(`${this.todourl}/${todoobj.Id}`, JSON.stringify(todoobj), this.GetToken())
            .map((response:Response) => response.json());
    }

    private GetToken() {        
        let currentuser = JSON.parse(localStorage.getItem('currentuser'));        
        if (currentuser) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentuser.access_token });
            headers.append('Content-Type', 'application/json');  
            return new RequestOptions({ headers: headers });
        }
    }  
}