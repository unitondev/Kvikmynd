import lodash from 'lodash'
import { put, select, takeEvery } from 'redux-saga/effects'

import * as callMethods from './callMethods'
import { enqueueSnackbarError } from '../actions'
import { startLoadingUser, stopLoadingUser } from '../modules/account/actions'
import { getJwt } from '../modules/account/selectors'

export function * sagaAllUsers (action) {
  yield takeEvery(({ type }) => /_REQUEST$/g.test(type), GenericUsersSaga)
}

export function * GenericUsersSaga (action) {
  const { payload, type } = action
  const methodName = lodash.camelCase(type)
  const token = yield select(getJwt)
  yield put(startLoadingUser())

  try {
    const response = yield callMethods[methodName](payload, token)
    yield put(stopLoadingUser())
    const successType = action.type.replace('_REQUEST', '_SUCCESS')
    yield put({ type: successType, payload: response.data })
  } catch (e) {
    yield put(stopLoadingUser())
    yield put(
      enqueueSnackbarError({
        message: e.response.data.title || e.response.data,
        key: new Date().getTime() + Math.random(),
      })
    )
    const failedType = action.type.replace('_REQUEST', '_FAIL')
    yield put({ type: failedType, payload: e.response, e })
  }
}
