import React, { useEffect, useState } from 'react';
import {
  createMuiTheme, 
  ThemeProvider,
  makeStyles, 
} from '@material-ui/core';
import AvatarBuilder from './js/components/builder/avatar-builder';
import './App.css';
import { setAvatar, setLayers } from './js/redux/actions/index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    avatar: state.avatar
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setAvatar: avatar => dispatch(setAvatar(avatar)),
    setLayers: layers => dispatch(setLayers(layers)),
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
  const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: 'center',
      marginTop: '2rem',
    },
  }));
  const classes = useStyles();

  const [avatar, setAvatar] = useState(null);
  const [layers, setLayers] = useState(null);

  useEffect(() => {
    if(!avatar){
      let test_avatar = require('./js/test-avatar.json');
      setAvatar(test_avatar);
      props.setAvatar(test_avatar);
    }
  }, [avatar, props]);

  useEffect(() => {
    if(!layers){
      let test_layers = require('./js/test-layers.json');
      setLayers(test_layers);
      props.setLayers(test_layers);
    }
  }, [layers, props]);

  return (
    <ThemeProvider theme={theme} >
      <div className={classes.root}>
        <AvatarBuilder />
      </div>
    </ThemeProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
