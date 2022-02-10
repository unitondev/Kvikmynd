import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import ReactDOM from 'react-dom'
import { SnackbarProvider } from 'notistack'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { rootReducer } from './reducers/rootReducer'
import { sagaWatcher } from './sagas'

const saga = createSagaMiddleware()

const composeEnhancer = composeWithDevTools({
  trace: true,
  traceLimit: 25,
})

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(saga)))

saga.run(sagaWatcher)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={3000}
        maxSnack={3}
      >
        <App />
      </SnackbarProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
