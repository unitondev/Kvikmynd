import {
  takeEvery,
  fork,
  take,
  cancel,
  select,
  call,
  put,
  cancelled,
  all,
} from 'redux-saga/effects'
import _ from 'lodash'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { getJwt } from '@movie/modules/account/selectors'
import APIRequests from '@movie/shared/utils/API'
import ApiService from '@movie/services/API'
import { createRootReducer } from './reducers'
import appSaga from './sagas/appSaga'
import accountSagas from '../modules/account/sagas'
import movieSagas from '../modules/movie/sagas'
import movieListSagas from '../modules/movieList/sagas'

export const history = createBrowserHistory()
// eslint-disable-next-line import/no-mutable-exports
export let reduxStore
const apiHostName = process.env.REACT_APP_API_HOST_NAME

// call api section

export function* callApi(action) {
  const accessToken = yield select(getJwt)
  const data = APIRequests[_.camelCase(action.type)](action.payload)
  const abortController = new AbortController()

  try {
    const response = yield call(ApiService, {
      apiHostName,
      accessToken,
      data,
      signal: abortController.signal,
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
    // eslint-disable-next-line no-console
    console.error(errorObject)
    yield put(errorObject)
  } finally {
    if (yield cancelled()) {
      abortController.abort()
    }
  }
}

export function callApiPromise(action, options = { callResultActions: true }) {
  const state = reduxStore.getState()
  const accessToken = getJwt(state)
  const data = APIRequests[_.camelCase(action.type)](action.payload)

  return new Promise((resolve, reject) => {
    ApiService({
      apiHostName,
      accessToken,
      data,
    })
      .then((response) => {
        const successModel = {
          type: action.type.replace('_REQUEST', '_SUCCESS'),
          response,
          payload: action.payload,
        }

        if (options.callResultActions) {
          reduxStore.dispatch(successModel)
        }

        resolve(successModel)
      })
      .catch((e) => {
        const errorModel = {
          type: action.type.replace('_REQUEST', '_FAILED'),
          payload: action.payload,
          message: e.statusText,
          status: e.status,
          response: e.response,
        }

        if (options.callResultActions) {
          reduxStore.dispatch(errorModel)
        }

        reject(errorModel)
      })
  })
}

function* cancellableCallApi(action) {
  const forkedCallApi = yield fork(callApi, action)
  const cancelledType = action.type.replace('_REQUEST', '_CANCEL')

  yield take(cancelledType)
  yield cancel(forkedCallApi)
}

export function* watchRequest() {
  yield takeEvery(({ type }) => /^.*_REQUEST$/.test(type), cancellableCallApi)
}

// root saga

function* rootSaga() {
  yield all([watchRequest(), appSaga(), accountSagas(), movieSagas(), movieListSagas()])
}

// create store section

export default () => {
  const composeEnhancer = composeWithDevTools({
    trace: true,
    traceLimit: 25,
  })

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['account'],
  }

  const saga = createSagaMiddleware()

  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    composeEnhancer(applyMiddleware(saga, routerMiddleware(history)))
  )

  saga.run(rootSaga)

  reduxStore = store
  return store
}
