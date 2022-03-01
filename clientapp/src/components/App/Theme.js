import React, { useMemo, useState } from 'react'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const Theme = ({ children }) => {
  const [mode, setMode] = useState('light')

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    },
  }), [])

  const theme = useMemo(() => createTheme({
    palette: {
      mode
    },
    shape: {
      borderRadius: 10,
    }
  }), [mode])

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            { children }
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  )
}

export default Theme
