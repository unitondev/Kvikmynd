import {call, put} from "redux-saga/effects";
import {axiosWithJwtAndData} from "../../axios";
import {updateUserRequestFailed, updateUserRequestSuccess} from "../actions";


export function* sagaUpdateUserRequest(data){
    try{
        const response = yield call(
            axiosWithJwtAndData,
            'https://localhost:5001/update_user',
            'post',
            data.payload,
            data.payload.jwtToken,
        );

        if(response.status === 200){
            yield put(updateUserRequestSuccess(response.data));
        }
        else
            yield put(updateUserRequestFailed('Updating failed'));
    } catch (e) {
        yield put(updateUserRequestFailed(e.response.data));
    }
}