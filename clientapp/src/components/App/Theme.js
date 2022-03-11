import React, { useMemo, useState } from 'react'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {
  },
})

const Theme = ({ children }) => {
  const [mode, setMode] = useState('light')

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    },
  }), [])

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
    shape: {
      borderRadius: 10,
    },
  }), [mode])

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            autoHideDuration={1500}
          >
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  )
}

export default Theme
