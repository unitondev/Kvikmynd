import {handleActions} from "redux-actions";
import {loginRequestFailed, loginRequestSuccess, logoutRequestSuccess} from "../actions";

const initState = {
    isLoginSucceeded: false,
    user: null,
    message: ''
}

export const loginOutReducer = handleActions(
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
            }),
        [logoutRequestSuccess] : (state, action) => (
            {
                isLoginSucceeded: false,
                user: null,
                message: action.payload,
            }),
    }, initState)