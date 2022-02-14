import { call, put, select, takeEvery } from 'redux-saga/effects'
import _ from 'lodash'

import { getJwt } from '../../modules/account/selectors'
import APIRequests from '../../modules/shared/utils/API'
import ApiService from '../../services/API'

export function* callApi(action) {
  const apiHostName = 'https://localhost:5001/'
  const accessToken = yield select(getJwt)
  const data = APIRequests[_.camelCase(action.type)](action.payload)

  try {
    const response = yield call(ApiService, {
      apiHostName,
      accessToken,
      data,
    })

    const successActionType = action.type.replace('_REQUEST', '_SUCCESS')
    yield put({ type: successActionType, response, payload: action.payload })
  } catch (e) {
    const errorObject = {
      type: action.type.replace('_REQUEST', '_FAILURE'),
      payload: action.payload,
      message: e.statusText,
      status: e.status,
      response: e.response,
    }
    console.error(errorObject)
    yield put(errorObject)
  }
}

export function* watchRequest(action) {
  yield takeEvery(({ type }) => /^.*_REQUEST$/.test(type), callApi)
}
