import React, { useEffect, useState } from 'react';
import {
  createMuiTheme, 
  ThemeProvider, 
} from '@material-ui/core';
import AvatarBuilder from './js/components/builder/avatar-builder';
import './App.css';
import { setAvatar } from './js/redux/actions/index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    avatar: state.avatar
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setAvatar: avatar => dispatch(setAvatar(avatar)),
  }
};

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

function App(props) {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if(!avatar){
      let test_avatar = require('./js/test-avatar.json');
      props.setAvatar(test_avatar);
    }
  })
  return (
    <ThemeProvider theme={theme} >
      <div className="App">
        <AvatarBuilder />
      </div>
    </ThemeProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
