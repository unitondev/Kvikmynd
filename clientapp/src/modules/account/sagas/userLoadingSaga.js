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
        accountActions.logoutRequest,
        accountActions.updateUserRequest,
        accountActions.deleteUserRequest,
        accountActions.confirmEmailRequest,
        accountActions.registerRequest,
      ],
      startLoadingUser
    ),
    takeLatest(
      [
        accountActions.getMeSuccess,
        accountActions.getMeFailure,
        accountActions.logoutSuccess,
        accountActions.logoutFailure,
        accountActions.updateUserSuccess,
        accountActions.updateUserFailure,
        accountActions.deleteUserSuccess,
        accountActions.deleteUserFailure,
        accountActions.confirmEmailSuccess,
        accountActions.confirmEmailFailure,
        accountActions.registerSuccess,
        accountActions.registerFailure,
      ],
      stopLoadingUser
    ),
    takeLatest(accountActions.getTokenFailure, getTokenFailure),
  ])
}

export default userLoadingSaga
