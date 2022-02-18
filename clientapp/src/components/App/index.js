import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { ConnectedRouter } from 'connected-react-router'

import UI from './App'
import createStore, { history } from '../../state/createStore'
import * as appActions from '../../state/actions'

const theme = createTheme()
const store = createStore()

const App = () => {
  useEffect(() => {
    store.dispatch(appActions.onAppMounted())
  }, [])

  return (
    <Provider store={store}>
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              autoHideDuration={1500}
            >
              <Container maxWidth='lg'>
                <div className='App'>
                  <ConnectedRouter history={history}>
                    <UI />
                  </ConnectedRouter>
                </div>
              </Container>
            </SnackbarProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </React.StrictMode>
    </Provider>
  )
}

export default App
