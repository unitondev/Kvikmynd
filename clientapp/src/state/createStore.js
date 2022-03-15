import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { createRootReducer } from './reducers'
import { rootSaga } from './sagas'

export const history = createBrowserHistory()

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

  return store
}
