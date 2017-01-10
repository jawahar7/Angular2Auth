import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { LoginModel } from '../model/register.model';

@Injectable()
export class AuthService {
    private todourl = 'http://localhost/TodoApp/Authenticate';
    constructor(private _http: Http){}

    Register(model: any) {   
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });     
        return this._http.post("http://localhost/TokenApi/Authenticate/Register", JSON.stringify(model), options)
            .map((response:Response) => response.json());
    }  

    Login(model: LoginModel) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('client_id', model.email);
        urlSearchParams.append('client_secret', model.password);
        urlSearchParams.append('grant_type', "password");
        let body = urlSearchParams.toString();
        return this._http.post("http://localhost/TokenApi/token", body, options).map((response:Response) => response.json());                
    }  

    IsAuthenticated() {
        return this._http.get("http://localhost/TokenApi/Authenticate/GetUser", this.GetToken());
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