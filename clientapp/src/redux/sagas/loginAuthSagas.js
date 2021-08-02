import {call, put} from "redux-saga/effects";
import {axiosDefault, axiosWithJwt} from "../../axios";
import {
    enqueueSnackbarError, enqueueSnackbarSuccess,
    loginRequestSuccess,
    logoutRequestSuccess, refreshTokensRequestFailed,
    refreshTokensRequestSuccess,
    registerRequestSuccess, startLoadingUser, stopLoadingUser
} from "../actions";

export function* sagaLoginRequest(data){
    try {
        const response = yield call(
            axiosDefault,
            'https://localhost:5001/login',
            'post',
            JSON.stringify(data.payload)
        );

        if(response.data.jwtToken){
            yield put(loginRequestSuccess(response.data));
        } else
            yield put(enqueueSnackbarError(
                {
                    message: 'Login failed. There is not jwt token',
                    key: new Date().getTime() + Math.random(),
                })
            );
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}

export function* sagaRegisterRequest(data){
    yield put(startLoadingUser());
    try {
        const response = yield call(
            axiosDefault,
            'https://localhost:5001/register',
            'post',
            JSON.stringify(data.payload)
        );

        if(response.status === 200){
            yield put(registerRequestSuccess(response.data));
            yield put(enqueueSnackbarSuccess(
                {
                    message: 'Register successful. Now you will be redirected to home page',
                    key: new Date().getTime() + Math.random(),
                })
            );
        } else
            yield put(enqueueSnackbarError(
                {
                    message: 'Register failed',
                    key: new Date().getTime() + Math.random(),
                })
            );
        yield put(stopLoadingUser());
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
        yield put(stopLoadingUser());
    }
}

export function* sagaLogoutRequest(data){
    try{
        yield call(
            axiosWithJwt,
            'https://localhost:5001/logout',
            'get',
            data.payload
        )

        yield put(logoutRequestSuccess());
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}

export function* sagaRefreshTokens(){
    yield put(startLoadingUser());
    try {
        const response = yield call(
            axiosDefault,
            'https://localhost:5001/refresh_token',
            'get',
            null
        )

        if(response.status === 200)
            yield put(refreshTokensRequestSuccess(response.data));
        else
            yield put(refreshTokensRequestFailed());
        yield put(stopLoadingUser());
    } catch (e) {
        yield put(stopLoadingUser());
        yield put(refreshTokensRequestFailed());
    }
}