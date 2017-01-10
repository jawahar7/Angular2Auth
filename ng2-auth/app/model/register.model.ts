export interface RegisterModel {
    name: string;
    email: string;
    password: string;
    repassword: string;    
}

export interface LoginModel {
    email: string;
    password: string;
}