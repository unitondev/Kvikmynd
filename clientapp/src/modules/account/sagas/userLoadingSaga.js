import { all, put, takeLatest } from 'redux-saga/effects'

import * as accountActions from '../actions'
import * as notificationActions from '../../shared/snackBarNotification/actions'

function * startLoadingUser(action) {
  yield put(accountActions.startLoadingUser())
}

function * stopLoadingUser(action) {
  yield put(accountActions.stopLoadingUser())
}

function * loginFailure(action) {
  const message = 'Login failure'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function * userLoadingSaga() {
  yield all([
    takeLatest(
      [
        accountActions.loginRequest,
        accountActions.registerRequest,
        accountActions.logoutRequest,
        accountActions.refreshTokensRequest,
        accountActions.updateUserRequest,
        accountActions.deleteUserRequest,
      ],
      startLoadingUser
    ),
    takeLatest([
        accountActions.loginSuccess,
        accountActions.loginFailure,
        accountActions.registerSuccess,
        accountActions.registerFailure,
        accountActions.logoutSuccess,
        accountActions.logoutFailure,
        accountActions.refreshTokensSuccess,
        accountActions.refreshTokensFailure,
        accountActions.updateUserSuccess,
        accountActions.updateUserFailure,
        accountActions.deleteUserSuccess,
        accountActions.deleteUserFailure,
      ],
      stopLoadingUser
    ),
    takeLatest(accountActions.loginFailure, loginFailure),
  ])
}

export default userLoadingSaga
