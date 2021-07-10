import {createAction} from "redux-actions";
export const fetchUsers = createAction('FETCH_USERS');
export const fetchUsersSaga = createAction('FETCH_USERS_SAGA');
export const loginRequest = createAction('LOGIN_REQUEST');
export const loginRequestSuccess = createAction('LOGIN_REQUEST_SUCCESS');
export const loginRequestFailed = createAction('LOGIN_REQUEST_FAILED');
export const registerRequest = createAction('REGISTER_REQUEST');
export const registerRequestSuccess = createAction('REGISTER_REQUEST_SUCCESS');
export const registerRequestFailed = createAction('REGISTER_REQUEST_FAILED');
