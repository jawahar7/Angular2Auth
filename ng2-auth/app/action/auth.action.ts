import { Auth } from '../model/auth.model';

export function setUser(auth: Auth){
    return {
        type: 'SET_USER', payload: {auth}
    }
}