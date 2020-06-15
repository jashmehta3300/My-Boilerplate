import { START_AUTH, END_AUTH, LOGIN_USER, LOGOUT_USER, STORE_TOKEN } from './types';

// start the auth process
export const startAuth = () => {
    return {
        type: START_AUTH
    }
}

// end the auth process 
export const endAuth = (error) => {
    return {
        type: END_AUTH,
        error: error
    }
}

// if login is successful, store token in the state
export const storeToken = (token) => {
    return {
        type: STORE_TOKEN,
        token: token
    }
}
