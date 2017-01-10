import { Alert } from '../model/alert.model';

export function addAlert(alert: Alert) {
    return {
        type: 'ADD_ALERT', payload: alert
    }
}

export function removeAlert(id: string) {
    return {
        type: 'REMOVE_ALERT', payload: {id}
    }
}

export function removeAllAlert() {
    return {
        type: 'REMOVE_ALL_ALERT'
    }
}