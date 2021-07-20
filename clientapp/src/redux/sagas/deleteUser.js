import {call, put} from "redux-saga/effects";
import {axiosWithJwt} from "../../axios";
import {
    deleteUserRequestSuccess,
    enqueueSnackbarError, enqueueSnackbarSuccess,
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
            yield put(enqueueSnackbarSuccess(
                {
                    message: 'Deleting successful',
                    key: new Date().getTime() + Math.random(),
                })
            );
        }
        else
            yield put(enqueueSnackbarError(
                {
                    message: 'Deleting failed',
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