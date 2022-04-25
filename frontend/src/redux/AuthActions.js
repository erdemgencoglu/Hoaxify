import * as ACTIONS from './Constants'
import { login, signUp } from '../Api/ApiCalls'
///
///

export const logoutSuccess = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    }
}

export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    }
}

//fonksiyon dönüyor bunu işlemek için ara katman kullanılmalı redux thunk (configureStore da kullanılır) 
export const loginHandler = (credential) => {
    return async function (dispatch) {
        const response = await login(credential)
        const authState = {
            ...response.data,
            password: credential.password
        }
        dispatch(loginSuccess(authState))
        return response
    }
}
//sign up accitons if success await login handler
export const signUpHandler = (user) => {
    return async function (dispatch) {
        const response = await signUp(user)
        await dispatch(loginHandler(user))
        return response
    }
} 