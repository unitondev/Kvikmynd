import React from 'react'
import { Container } from '@mui/material'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { SnackbarProvider } from 'notistack'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux'

import UI from './App'
import { rootReducer } from '../../state/reducers'
import { sagaWatcher } from '../../sagas'

const theme = createTheme()

const saga = createSagaMiddleware()

const composeEnhancer = composeWithDevTools({
  trace: true,
  traceLimit: 25,
})

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(saga)))

saga.run(sagaWatcher)

const App = () => (
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
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Container maxWidth='lg'>
              <div className='App'>
                <UI />
              </div>
            </Container>
          </ThemeProvider>
        </StyledEngineProvider>
      </SnackbarProvider>
    </React.StrictMode>
  </Provider>
)

export default App
