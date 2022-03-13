import { createAction } from 'redux-actions'

export const logoutRequest = createAction('LOGOUT_REQUEST')
export const logoutSuccess = createAction('LOGOUT_SUCCESS')
export const logoutFailure = createAction('LOGOUT_FAILURE')

export const refreshTokensRequest = createAction('REFRESH_TOKENS_REQUEST')
export const refreshTokensSuccess = createAction('REFRESH_TOKENS_SUCCESS')
export const refreshTokensFailure = createAction('REFRESH_TOKENS_FAILURE')

export const updateUserRequest = createAction('UPDATE_USER_REQUEST')
export const updateUserSuccess = createAction('UPDATE_USER_SUCCESS')
export const updateUserFailure = createAction('UPDATE_USER_FAILURE')

export const deleteUserRequest = createAction('DELETE_USER_REQUEST')
export const deleteUserSuccess = createAction('DELETE_USER_SUCCESS')
export const deleteUserFailure = createAction('DELETE_USER_FAILURE')

export const registerRequest = createAction('REGISTER_REQUEST')
export const registerSuccess = createAction('REGISTER_SUCCESS')
export const registerFailure = createAction('REGISTER_FAILURE')

export const startLoadingUser = createAction('START_LOADING_USER')
export const stopLoadingUser = createAction('STOP_LOADING_USER')

export const onLogin = createAction('ON_LOGIN')
export const onLogout = createAction('ON_LOGOUT')
export const onRegister = createAction('ON_REGISTER')
export const onRefreshToken = createAction('ON_REFRESH_TOKEN')
export const onForgotPassword = createAction('ON_FORGOT_PASSWORD')

export const getTokenRequest = createAction('GET_TOKEN_REQUEST')
export const getTokenSuccess = createAction('GET_TOKEN_SUCCESS')
export const getTokenFailure = createAction('GET_TOKEN_FAILURE')

export const getMeRequest = createAction('GET_ME_REQUEST')
export const getMeSuccess = createAction('GET_ME_SUCCESS')
export const getMeFailure = createAction('GET_ME_FAILURE')

export const changePasswordRequest = createAction('CHANGE_PASSWORD_REQUEST')
export const changePasswordSuccess = createAction('CHANGE_PASSWORD_SUCCESS')
export const changePasswordFailure = createAction('CHANGE_PASSWORD_FAILURE')

export const forgotPasswordRequest = createAction('FORGOT_PASSWORD_REQUEST')
export const forgotPasswordSuccess = createAction('FORGOT_PASSWORD_SUCCESS')
export const forgotPasswordFailure = createAction('FORGOT_PASSWORD_FAILURE')
export const resetForgotPassword = createAction('RESET_FORGOT_PASSWORD_STATE')

export const resetPasswordRequest = createAction('RESET_PASSWORD_REQUEST')
export const resetPasswordSuccess = createAction('RESET_PASSWORD_SUCCESS')
export const resetPasswordFailure = createAction('RESET_PASSWORD_FAILURE')

