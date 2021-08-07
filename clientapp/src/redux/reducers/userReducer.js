import {handleActions} from "redux-actions";
import {
    deleteUserSuccess,
    loginSuccess,
    logoutSuccess, refreshTokensFail,
    refreshTokensSuccess,
    registerSuccess, startLoadingUser, stopLoadingUser,
    updateUserSuccess
} from "../actions";

const initState = {
    isLoginSucceeded: undefined,
    user: null,
    loading: false,
}

export const userReducer = handleActions(
    {
        [loginSuccess]: (state, action) => (
            {
                ...state,
                isLoginSucceeded: true,
                user: action.payload,
            }),
        [logoutSuccess] : (state, action) => (
            {
                ...state,
                isLoginSucceeded: false,
                user: null,
            }),
        [refreshTokensSuccess]: (state, action) => (
            {
                ...state,
                isLoginSucceeded: true,
                user: action.payload,
            }),
        [refreshTokensFail]: (state) => (
            {
                ...state,
                isLoginSucceeded: false,
            }),
        [updateUserSuccess] : (state, action) => (
            {
                ...state,
                isLoginSucceeded: false,
                user: action.payload,
            }),
        [deleteUserSuccess] : (state) => (
            {
                ...state,
                isLoginSucceeded: false,
                user: null,
            }),
        [registerSuccess] : (state, action) => (
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