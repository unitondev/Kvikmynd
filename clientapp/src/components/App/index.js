import React, { useEffect, } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import UI from './App'
import MUI from './Theme'
import createStore, { history } from '../../state/createStore'
import * as appActions from '../../state/actions'

const store = createStore()
const persistor = persistStore(store)

const App = () => {
  useEffect(() => {
    store.dispatch(appActions.onAppMounted())
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <MUI>
            <div className='App'>
              <ConnectedRouter history={history}>
                <UI />
              </ConnectedRouter>
            </div>
          </MUI>
        </React.StrictMode>
      </PersistGate>
    </Provider>
  )
}

export default App
