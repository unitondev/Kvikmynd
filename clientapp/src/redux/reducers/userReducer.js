import {handleActions} from "redux-actions";
import {
    deleteUserRequestSuccess,
    loginRequestSuccess,
    logoutRequestSuccess, refreshTokensRequestFailed,
    refreshTokensRequestSuccess,
    registerRequestSuccess, startLoadingUser, stopLoadingUser,
    updateUserRequestSuccess
} from "../actions";

const initState = {
    isLoginSucceeded: undefined,
    user: null,
    loading: false,
}

export const userReducer = handleActions(
    {
        [loginRequestSuccess]: (state, action) => (
            {
                ...state,
                isLoginSucceeded: true,
                user: action.payload,
            }),
        [logoutRequestSuccess] : (state, action) => (
            {
                ...state,
                isLoginSucceeded: false,
                user: null,
            }),
        [refreshTokensRequestSuccess]: (state, action) => (
            {
                ...state,
                isLoginSucceeded: true,
                user: action.payload,
            }),
        [refreshTokensRequestFailed]: (state) => (
            {
                ...state,
                isLoginSucceeded: false,
            }),
        [updateUserRequestSuccess] : (state, action) => (
            {
                ...state,
                isLoginSucceeded: false,
                user: action.payload,
            }),
        [deleteUserRequestSuccess] : (state) => (
            {
                ...state,
                isLoginSucceeded: false,
                user: null,
            }),
        [registerRequestSuccess] : (state, action) => (
            {
                ...state,
                isLoginSucceeded: true,
                user: action.payload,
            }),
        [startLoadingUser] : (state) => (
            {
                ...state,
                loading: true,
            }),
        [stopLoadingUser] : (state) => (
            {
                ...state,
                loading: false,
            }),
    }, initState)