import {call, put} from "redux-saga/effects";
import {axiosDefault, axiosWithJwt} from "../../axios";
import {
    loginRequestFailed,
    loginRequestSuccess,
    logoutRequestSuccess,
    refreshTokensRequestFailed,
    refreshTokensRequestSuccess,
    registerRequestFailed,
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

        if(response.data.jwtToken)
            yield put(loginRequestSuccess(response.data));
        else
            yield put(loginRequestFailed('Login failed. There is not jwt token'));
    } catch (e) {
        yield put(loginRequestFailed(e.response.data));
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

        if(response.status === 200)
            yield put(registerRequestSuccess(response.data));
        else
            yield put(registerRequestFailed('Register failed'));
    } catch (e) {
        yield put(registerRequestFailed(e.response.data));
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
        yield put(logoutRequestSuccess(e.response.data));
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

        if(response.status === 200){
            yield put(refreshTokensRequestSuccess(response.data));
        }
        else
            yield put(refreshTokensRequestFailed('Refresh query went wrong'));
    } catch (e) {
        yield put(refreshTokensRequestFailed());
    }
    
}