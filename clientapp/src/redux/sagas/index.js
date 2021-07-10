import { put, call, takeEvery } from "redux-saga/effects";
import {axiosDefault} from "../../axios";
import {fetchUsers, fetchUsersSaga, loginRequest, registerRequest} from "../actions";
import {sagaLoginRequest, sagaRegisterRequest} from "./loginAuthSagas";

export function* sagaWatcher(){
    yield takeEvery([fetchUsersSaga], sagaRequestUsers);
    yield takeEvery([loginRequest], sagaLoginRequest);
    yield takeEvery([registerRequest], sagaRegisterRequest);
}

function* sagaRequestUsers(data){
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
