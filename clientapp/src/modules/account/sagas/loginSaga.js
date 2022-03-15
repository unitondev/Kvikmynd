import { all, put, select, take, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import * as accountActions from '../actions'
import * as notificationActions from '../../shared/snackBarNotification/actions'
import routes from '@movie/routes'

function * onLogin(action) {
  yield put(accountActions.getTokenRequest(action.payload))
  const result = yield take([accountActions.getTokenSuccess, accountActions.getTokenFailure])

  if (result.type === accountActions.getTokenFailure().type) {
    const location = yield select(state => state.router.location.pathname)
    if (!location.startsWith(routes.login)) {
      yield put(push(routes.login))
    }
    return
  }

  yield put(accountActions.getMeRequest())
  // TODO add redirect here if exists
}

function * onRefreshToken(action) {
  yield put(accountActions.refreshTokensRequest())
  const result = yield take([accountActions.refreshTokensSuccess, accountActions.refreshTokensFailure])
  if (result.type === accountActions.refreshTokensSuccess().type) {
    yield put(accountActions.getMeRequest())
  }
}

function * logoutSuccess (action) {
  yield put(push(routes.root))
}

function * changePasswordSuccess (action) {
  const message = 'Password was successfully changed'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))
  yield put(push(routes.login))
}

function * changePasswordFailure (action) {
  const message = 'Password was not changed'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function * onForgotPassword (action) {
  const { email } = action.payload
  yield put(accountActions.forgotPasswordRequest({ Email: email }))
  const result = yield take([accountActions.forgotPasswordSuccess, accountActions.forgotPasswordFailure])
  if (result.type === accountActions.forgotPasswordFailure().type) {
    const message = 'Reset password failed'
    yield put(notificationActions.enqueueSnackbarError({ message }))
    yield put(push(routes.login))
    return
  }
}

function * resetPasswordFailure (action) {
  const message = 'Reset password failed'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function * loginSaga() {
  yield all([
    takeLatest(accountActions.onLogin, onLogin),
    takeLatest(accountActions.onRefreshToken, onRefreshToken),
    takeLatest(accountActions.logoutSuccess, logoutSuccess),
    takeLatest(accountActions.changePasswordSuccess, changePasswordSuccess),
    takeLatest(accountActions.changePasswordFailure, changePasswordFailure),
    takeLatest(accountActions.onForgotPassword, onForgotPassword),
    takeLatest(accountActions.resetPasswordFailure, resetPasswordFailure),
  ])
}

export default loginSaga
