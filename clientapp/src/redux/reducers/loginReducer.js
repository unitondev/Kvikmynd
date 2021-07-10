import {handleActions} from "redux-actions";
import {loginRequestFailed, loginRequestSuccess} from "../actions";

const initState = {
    isLoginSucceeded: false,
    user: null,
    message: ''
}

export const loginReducer = handleActions(
    {
        [loginRequestSuccess]: (state, action) => (
            {
                isLoginSucceeded: true,
                user: action.payload,
            }),
        [loginRequestFailed]: (state, action) => (
            {
                ...state,
                isLoginSucceeded: false,
                message: action.payload
            })
    }, initState)