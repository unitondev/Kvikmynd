import React, { useEffect, } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import UI from './App'
import MUI from './Theme'
import createStore, { history } from '../../state/createStore'
import * as appActions from '../../state/actions'

const store = createStore()

const App = () => {
  useEffect(() => {
    store.dispatch(appActions.onAppMounted())
  }, [])

  return (
    <Provider store={store}>
      <React.StrictMode>
        <MUI>
          <div className='App'>
            <ConnectedRouter history={history}>
              <UI />
            </ConnectedRouter>
          </div>
        </MUI>
      </React.StrictMode>
    </Provider>
  )
}

export default App
