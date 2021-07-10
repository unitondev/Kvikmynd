import { put, call, takeEvery } from "redux-saga/effects";
import {axiosDefault} from "../../axios";
import {fetchUsers, fetchUsersSaga} from "../actions";

export function* sagaWatcher(){
    yield takeEvery([fetchUsersSaga], sagaWorker);
}

function* sagaWorker(data){
    try {
        const response = yield call(
            axiosDefault,
            'https://localhost:5001/users',
            'get',
            data
        );

        yield put(fetchUsers(response.data) );
    } catch (e) {
        // catch error
    }
}
