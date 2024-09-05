import { createTheme, ThemeProvider } from '@mui/material';
import React, { createContext, useState } from 'react';

export const ColorModeContext = createContext();

function CustomTheme({ children }) {
  const [mode, setMode] = useState('light');

  const colorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
          primary: {
            main: '#000000',
          },
        }
        : {
          primary: {
            main: '#2196f3',
          },
        }),
    },
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default CustomTheme;