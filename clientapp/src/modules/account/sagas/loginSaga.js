import { all, put, take, takeLatest } from 'redux-saga/effects'

import * as accountActions from '../actions'
import routes from '@movie/routes'

function * onLogin(action) {
  yield put(accountActions.getTokenRequest(action.payload))
  const result = yield take([accountActions.getTokenSuccess, accountActions.getTokenFailure])
  if (result.type === accountActions.getTokenFailure().type) {
    // push from connected-react-router
    // yield put(push(routes.login))
    return
  }

  yield put(accountActions.getMeRequest())
  // TODO add redirect here if exists
}

function * loginSaga() {
  yield all([takeLatest(accountActions.onLogin, onLogin)])
}

export default loginSaga
