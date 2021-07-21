import {handleActions} from "redux-actions";
import {
    deleteUserRequestSuccess,
    loginRequestSuccess,
    logoutRequestSuccess,
    refreshTokensRequestSuccess,
    registerRequestSuccess,
    updateUserRequestSuccess
} from "../actions";

const initState = {
    isLoginSucceeded: false,
    user: null,
}

export const userReducer = handleActions(
    {
        [loginRequestSuccess]: (state, action) => (
            {
                isLoginSucceeded: true,
                user: action.payload,
            }),
        [logoutRequestSuccess] : (state, action) => (
            {
                isLoginSucceeded: false,
                user: null,
            }),
        [refreshTokensRequestSuccess]: (state, action) => (
            {
                isLoginSucceeded: true,
                user: action.payload,
            }),
        [updateUserRequestSuccess] : (state, action) => (
            {
                isLoginSucceeded: false,
                user: action.payload,
            }),
        [deleteUserRequestSuccess] : (state, action) => (
            {
                isLoginSucceeded: false,
                user: null,
            }),
        [registerRequestSuccess] : (state, action) => (
            {
                isLoginSucceeded: true,
                user: action.payload,
            }),
    }, initState)