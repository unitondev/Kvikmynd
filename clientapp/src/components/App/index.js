import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

import UI from './App'
import createStore from '../../state/createStore'
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
                  <UI />
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
