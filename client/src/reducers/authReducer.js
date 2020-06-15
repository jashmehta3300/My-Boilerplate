import { LOGIN_USER, LOGOUT_USER, START_AUTH, END_AUTH, STORE_TOKEN } from '../actions/types'

const initialState = {
    //set your initial state here
    login: false,
    loading: false,
    token: null,
    authError: null
}

export default ( state = initialState, action ) => {   
    switch(action.type){
        case STORE_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case START_AUTH:
            return {
                ...state,
                loading: true
            }
        case END_AUTH:
            return {
                ...state,
                loading: false,
                authError: action.error
            }
        default:
            return state
    }
}