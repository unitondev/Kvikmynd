import { takeEvery } from "redux-saga/effects";
import {
    deleteUserRequest,
    loginRequest,
    logoutRequest,
    refreshTokensRequest,
    registerRequest,
    updateUserRequest
} from "../actions";
import {sagaLoginRequest, sagaRegisterRequest, sagaLogoutRequest, sagaRefreshTokens} from "./loginAuthSagas";
import {sagaUpdateUserRequest} from "./updateUser";
import {sagaDeleteUserRequest} from "./deleteUser";

export function* sagaWatcher(){
    yield takeEvery([loginRequest], sagaLoginRequest);
    yield takeEvery([registerRequest], sagaRegisterRequest);
    yield takeEvery([logoutRequest], sagaLogoutRequest);
    yield takeEvery([refreshTokensRequest], sagaRefreshTokens);
    yield takeEvery([updateUserRequest], sagaUpdateUserRequest);
    yield takeEvery([deleteUserRequest], sagaDeleteUserRequest);
}