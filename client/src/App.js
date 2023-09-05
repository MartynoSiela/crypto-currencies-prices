import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from 'styles/theme';
import RouterProvider from 'components/routerProvider';

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <RouterProvider colorTheme={theme} toggleColorTheme={toggleTheme} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
