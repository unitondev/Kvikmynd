import React from 'react'
import { Container } from '@mui/material'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';

import { AppRouter } from './AppRouter'

const theme = createTheme()

const App = () => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Container maxWidth='lg'>
        <div className='App'>
          <AppRouter />
        </div>
      </Container>
    </ThemeProvider>
  </StyledEngineProvider>
)

export default App
