import {createAction} from "redux-actions";
export const loginRequest = createAction('LOGIN_REQUEST');
export const loginRequestSuccess = createAction('LOGIN_REQUEST_SUCCESS');
export const loginRequestFailed = createAction('LOGIN_REQUEST_FAILED');
export const registerRequest = createAction('REGISTER_REQUEST');
export const registerRequestSuccess = createAction('REGISTER_REQUEST_SUCCESS');
export const registerRequestFailed = createAction('REGISTER_REQUEST_FAILED');
export const logoutRequest = createAction('LOGOUT_REQUEST');
export const logoutRequestSuccess = createAction('LOGOUT_REQUEST_SUCCESS');
export const logoutRequestFailed = createAction('LOGOUT_REQUEST_FAILED');
// FORDEVONLY
export const fetchUsers = createAction('FETCH_USERS');
export const fetchUsersSaga = createAction('FETCH_USERS_SAGA');
export const testAuthorizeSaga = createAction('TEST_AUTHORIZE_SAGA');
export const testAuthorize = createAction('TEST_AUTHORIZE');