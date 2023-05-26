import { all, put, select, takeLatest } from 'redux-saga/effects'
import _ from 'lodash'

import { onAppMounted as onAppMountedAction } from '../actions'
import { getUser } from '@movie/modules/account/selectors'
import * as accountActions from '@movie/modules/account/actions'
import { getMySubscriptions } from '@movie/modules/account/actions'

function* onAppMounted() {
  const user = yield select(getUser)
  if (!_.isEmpty(user)) {
    yield put(getMySubscriptions.request())
    // yield put(accountActions.onRefreshToken())
  }
}

function* appSaga() {
  yield all([takeLatest(onAppMountedAction, onAppMounted)])
}

export default appSaga
