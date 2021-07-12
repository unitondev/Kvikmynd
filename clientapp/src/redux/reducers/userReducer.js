import {handleActions} from "redux-actions";
import {
    deleteUserRequestFailed,
    deleteUserRequestSuccess,
    loginRequestFailed,
    loginRequestSuccess,
    logoutRequestSuccess,
    refreshTokensRequestFailed,
    refreshTokensRequestSuccess,
    registerRequestFailed,
    registerRequestSuccess,
    updateUserRequestFailed,
    updateUserRequestSuccess
} from "../actions";

const initState = {
    isLoginSucceeded: false,
    isUpdated: false,
    user: null,
    message: ''
}

export const userReducer = handleActions(
    {
        [loginRequestSuccess]: (state, action) => (
            {
                isLoginSucceeded: true,
                user: action.payload,
                message: ''
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
        [refreshTokensRequestSuccess]: (state, action) => (
            {
                isLoginSucceeded: true,
                user: action.payload,
            }),
        [refreshTokensRequestFailed]: (state, action) => (
            {
                ...state,
            }),
        [updateUserRequestSuccess] : (state, action) => (
            {
                isLoginSucceeded: false,
                isUpdated: true,
                user: action.payload,
                message: 'User has been updated',
            }),
        [updateUserRequestFailed] : (state, action) => (
            {
                ...state,
                isUpdated: false,
                message: action.payload
            }),
        [deleteUserRequestSuccess] : (state, action) => (
            {
                isLoginSucceeded: false,
                user: null,
                message: ''
            }),
        [deleteUserRequestFailed] : (state, action) => (
            {
                ...state,
                message: 'Deleting failed'
            }),
        [registerRequestSuccess] : (state, action) => (
            {
                isLoginSucceeded: true,
                user: action.payload,
                message: ''
            }),
        [registerRequestFailed]: (state, action) => (
            {
                isRegisterComplete: false,
                message: action.payload
            }),
    }, initState)