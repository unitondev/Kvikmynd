import { put, call, takeEvery } from "redux-saga/effects";
import {FETCH_USERS, FETCH_USERS_SAGA} from "../types";
import axios from "axios";
// import * as actions from "../actions";

export function* sagaWatcher(){
    yield takeEvery(FETCH_USERS_SAGA, sagaWorker);
}

function* sagaWorker(){
    try {
        const response = yield call(fetchUsers);
        yield put({ type: FETCH_USERS, payload: response} );
    } catch (e) {
        // catch error
    }
}

async function fetchUsers() {
    const response = await axios.get('https://localhost:5001/users');
    console.log(response.data);
    return response.data;
}