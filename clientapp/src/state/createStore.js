import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from './reducers'
import { rootSaga } from './sagas'

export default () => {
  const composeEnhancer = composeWithDevTools({
    trace: true,
    traceLimit: 25,
  })

  const saga = createSagaMiddleware()

  const store = createStore(rootReducer, composeEnhancer(applyMiddleware(saga)))

  saga.run(rootSaga)

  return store
}
