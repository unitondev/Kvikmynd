import {call, put} from "redux-saga/effects";
import {axiosWithJwt} from "../../axios";
import {
    deleteUserRequestFailed,
    deleteUserRequestSuccess,
} from "../actions";

export function* sagaDeleteUserRequest(data){
    try{
        const response = yield call(
            axiosWithJwt,
            'https://localhost:5001/delete_user',
            'get',
            data.payload
        )

        if(response.status === 200){
            yield put(deleteUserRequestSuccess(response.data));
        }
        else
            yield put(deleteUserRequestFailed('Deleting failed'));
    } catch (e) {
        yield put(deleteUserRequestFailed(e.response.data));
    }
}