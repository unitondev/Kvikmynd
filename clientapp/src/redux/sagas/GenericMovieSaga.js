import lodash from 'lodash'
import { put, select, takeEvery } from 'redux-saga/effects'

import { getJwt } from '../selectors'
import * as callMethods from './callMethods'
import { enqueueSnackbarError } from '../actions'

export function * sagaAllMovies (action) {
  yield takeEvery(({ type }) => /_REQUESTFORMOVIE$/g.test(type), GenericMoviesSaga)
}

export function * GenericMoviesSaga (action) {
  const { payload, type } = action
  const methodName = lodash.camelCase(type)
  const token = yield select(getJwt)

  try {
    const response = yield callMethods[methodName](payload, token)
    const successType = action.type.replace('_REQUESTFORMOVIE', '_SUCCESS')
    yield put({ type: successType, payload: response.data })
  } catch (e) {
    yield put(
      enqueueSnackbarError({
        message: e.response.data.title || e.response.data,
        key: new Date().getTime() + Math.random(),
      })
    )
    const failedType = action.type.replace('_REQUESTFORMOVIE', '_FAIL')
    yield put({ type: failedType, payload: e.response, e })
  }
}
