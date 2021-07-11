import { put, call, takeEvery } from "redux-saga/effects";
import {axiosDefault, axiosWithJwt} from "../../axios";
import {fetchUsers, fetchUsersSaga, loginRequest, logoutRequest, registerRequest, testAuthorizeSaga} from "../actions";
import {sagaLoginRequest, sagaRegisterRequest, sagaLogoutRequest} from "./loginAuthSagas";

export function* sagaWatcher(){
    yield takeEvery([loginRequest], sagaLoginRequest);
    yield takeEvery([registerRequest], sagaRegisterRequest);
    yield takeEvery([logoutRequest], sagaLogoutRequest)
    // FORDEVONLY
    yield takeEvery([fetchUsersSaga], FORDEVONLY_sagaRequestUsers);
    yield takeEvery([testAuthorizeSaga], FORDEVONLY_sagaTestAuth);
}

// FORDEVONLY
function* FORDEVONLY_sagaRequestUsers(data){
    try {
        const response = yield call(
            axiosDefault,
            'https://localhost:5001/users',
            'get',
            JSON.stringify(data)
        );

        yield put(fetchUsers(response.data) );
    } catch (e) {
        // catch error
    }
}

// FORDEVONLY
function* FORDEVONLY_sagaTestAuth(data){
    try{
        const response = yield call(
            axiosWithJwt,
            'https://localhost:5001/test    ',
            'get',
            data.payload
        )

        if(response.status === 200){
            console.log('Auth succeeded');
        }
    }
    catch (e) {
        console.log(`ERROR:  ${e}`)
    }
}
