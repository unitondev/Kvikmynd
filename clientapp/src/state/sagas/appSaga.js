import { all, put, select, takeLatest } from 'redux-saga/effects'
import _ from 'lodash'

import * as appActions from '../actions'
import { getUser } from '@movie/modules/account/selectors'
import * as accountActions from '@movie/modules/account/actions'

function* onAppMounted(action) {
  const user = yield select(getUser)
  if (_.isEmpty(user)) yield put(accountActions.onRefreshToken())
}

function* appSaga() {
  yield all([takeLatest(appActions.onAppMounted, onAppMounted)])
}

export default appSaga
