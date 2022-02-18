import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import { createRootReducer } from './reducers'
import { rootSaga } from './sagas'

export const history = createBrowserHistory()

export default () => {
  const composeEnhancer = composeWithDevTools({
    trace: true,
    traceLimit: 25,
  })

  const saga = createSagaMiddleware()

  const store = createStore(createRootReducer(history), composeEnhancer(applyMiddleware(saga, routerMiddleware(history))))

  saga.run(rootSaga)

  return store
}
