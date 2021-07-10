import {call, put} from "redux-saga/effects";
import {axiosDefault} from "../../axios";
import {loginRequestFailed, loginRequestSuccess, registerRequestFailed, registerRequestSuccess} from "../actions";

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

        console.log(response)
        if(response.status === 200)
            yield put(registerRequestSuccess(response.data));
        else
            yield put(registerRequestFailed('Register failed'));
    } catch (e) {
        yield put(registerRequestFailed(e.response.data));
    }
}