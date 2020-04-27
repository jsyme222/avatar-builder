import React from 'react';
import {
  createMuiTheme, 
  ThemeProvider, 
} from '@material-ui/core';
import AvatarBuilder from './js/components/builder/avatar-builder';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#54068c'
     }, 
    secondary: {
        main: '#de871d'
     }, 
    success: {
        main: '#16ba64', //Green
    },
    black: {
      main: '#232323',
    },
    white: {
      main: '#f7f7f7',
      rgb: '247, 247, 247',
    },
    red: {
      main: '#BC3216',
      rgb: '188, 50, 22'
    },
    background: {
      paper: '#f7f7f7',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme} >
      <div className="App">
        <AvatarBuilder />
      </div>
    </ThemeProvider>
  );
}

export default App;
