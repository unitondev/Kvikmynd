import lodash from 'lodash'
import { put, select, takeEvery } from 'redux-saga/effects'

import { getJwt } from '../selectors/selectors'
import * as callMethods from './callMethods'
import { enqueueSnackbarError, needToUpdateMovie } from '../actions'

export function * sagaAllUpdates (action) {
  yield takeEvery(({ type }) => /_REQUESTFORUPDATE$/g.test(type), GenericUpdateSaga)
}

export function * GenericUpdateSaga (action) {
  const { payload, type } = action
  const methodName = lodash.camelCase(type)
  const token = yield select(getJwt)

  try {
    const response = yield callMethods[methodName](payload, token)
    const successType = action.type.replace('_REQUESTFORUPDATE', '_SUCCESS')
    yield put({ type: successType, payload: response.data })
    yield put(needToUpdateMovie())
  } catch (e) {
    yield put(
      enqueueSnackbarError({
        message: e.response.data.title || e.response.data,
        key: new Date().getTime() + Math.random(),
      })
    )
    const failedType = action.type.replace('_REQUESTFORUPDATE', '_FAIL')
    yield put({ type: failedType, payload: e.response, e })
  }
}