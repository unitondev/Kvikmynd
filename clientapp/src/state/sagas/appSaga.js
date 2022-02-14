import { all, put, select, takeLatest } from 'redux-saga/effects'

import * as appActions from '../actions'
import { getUser } from '../../modules/account/selectors'
import * as accountActions from '../../modules/account/actions'

function * onAppMounted (action) {
  const user = yield select(getUser)
  if (user === null) yield put(accountActions.refreshTokensRequest())
}

function * appSaga() {
  yield all([
    takeLatest(appActions.onAppMounted, onAppMounted),
  ])
}

export default appSaga