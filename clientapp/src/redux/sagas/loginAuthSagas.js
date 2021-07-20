import {call, put} from "redux-saga/effects";
import {axiosDefault, axiosWithJwt} from "../../axios";
import {
    enqueueSnackbarError, enqueueSnackbarSuccess,
    loginRequestSuccess,
    logoutRequestSuccess,
    refreshTokensRequestSuccess,
    registerRequestSuccess
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
            yield put(enqueueSnackbarSuccess(
                {
                    message: 'Login successful',
                    key: new Date().getTime() + Math.random(),
                })
            );
        }
        else
            yield put(enqueueSnackbarError(
                {
                    message: 'Login failed. There is not jwt token',
                    key: new Date().getTime() + Math.random(),
                })
            );
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}

export function* sagaRegisterRequest(data){
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
                    message: 'Register successful',
                    key: new Date().getTime() + Math.random(),
                })
            );
        }
        else
            yield put(enqueueSnackbarError(
                {
                    message: 'Register failed',
                    key: new Date().getTime() + Math.random(),
                })
            );
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
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
                message: e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}

export function* sagaRefreshTokens(){
    try {
        const response = yield call(
            axiosDefault,
            'https://localhost:5001/refresh_token',
            'get',
            null
        )

        if(response.status === 200)
            yield put(refreshTokensRequestSuccess(response.data));
    } catch (e) {}
}