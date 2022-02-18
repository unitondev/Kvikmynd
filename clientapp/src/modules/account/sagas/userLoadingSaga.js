import { all, put, takeLatest } from 'redux-saga/effects'

import * as accountActions from '../actions'
import * as notificationActions from '../../shared/snackBarNotification/actions'

function * startLoadingUser(action) {
  yield put(accountActions.startLoadingUser())
}

function * stopLoadingUser(action) {
  yield put(accountActions.stopLoadingUser())
}

function * getTokenFailure(action) {
  const message = 'Login failure'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function * userLoadingSaga() {
  yield all([
    takeLatest(
      [
        accountActions.getMeRequest,
        accountActions.registerRequest,
        accountActions.logoutRequest,
        accountActions.refreshTokensRequest,
        accountActions.updateUserRequest,
        accountActions.deleteUserRequest,
      ],
      startLoadingUser
    ),
    takeLatest([
      accountActions.getMeSuccess,
        accountActions.getMeFailure,
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
    takeLatest(accountActions.getTokenFailure, getTokenFailure),
  ])
}

export default userLoadingSaga
