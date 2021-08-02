import {call, put} from "redux-saga/effects";
import {axiosWithJwtAndData} from "../../axios";
import {
    enqueueSnackbarError,
    enqueueSnackbarSuccess,
    startLoadingUser,
    stopLoadingUser,
    updateUserRequestSuccess
} from "../actions";


export function* sagaUpdateUserRequest(data){
    yield put(startLoadingUser());
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
            yield put(enqueueSnackbarSuccess(
                {
                    message: 'Updating successful.  Now you will be redirected to login page',
                    key: new Date().getTime() + Math.random(),
                })
            );
        } else
            yield put(enqueueSnackbarError(
                {
                    message: 'Updating failed',
                    key: new Date().getTime() + Math.random(),
                })
            );
        yield put(stopLoadingUser());
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
        yield put(stopLoadingUser());
    }
}