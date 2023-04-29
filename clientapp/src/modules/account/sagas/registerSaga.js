import { all, put, take, takeLatest } from 'redux-saga/effects'

import * as accountActions from '../actions'
import * as notificationActions from '../../shared/snackBarNotification/actions'

function* onRegister(action) {
  yield put(accountActions.registerRequest(action.payload))
  const result = yield take([accountActions.registerSuccess, accountActions.registerFailure])
  if (result.type === accountActions.registerFailure().type) {
    const message = 'Register failure'
    yield put(notificationActions.enqueueSnackbarError({ message }))
  }
}

function* confirmEmailSuccess(action) {
  yield put(accountActions.getMeRequest())
}

function* registerSaga() {
  yield all([
    takeLatest(accountActions.onRegister, onRegister),
    takeLatest(accountActions.confirmEmailSuccess, confirmEmailSuccess),
  ])
}

export default registerSaga
