import React, { useEffect, useState } from 'react';
import {
  createMuiTheme, 
  ThemeProvider,
  makeStyles, 
} from '@material-ui/core';
import AvatarBuilder from './js/components/builder/avatar-builder';
import './App.css';
import { 
  setAvatar, 
  setLayers, 
  setBase,
  setFace,
  setGender,
  setEyes,
  setHair,
  setTops,
  setBottoms,
  setMouth
} from './js/redux/actions/index';
import { connect } from 'react-redux';
import { APIHandler } from './js/conf';

const mapStateToProps = state => {
  return {
    avatar: state.avatar
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setGender: gender => dispatch(setGender(gender)),
    setAvatar: avatar => dispatch(setAvatar(avatar)),
    setLayers: layers => dispatch(setLayers(layers)),
    setBase: base => dispatch(setBase(base)),
    setFace: face => dispatch(setFace(face)),
    setEyes: eyes => dispatch(setEyes(eyes)),
    setHair: hair => dispatch(setHair(hair)),
    setTops: tops => dispatch(setTops(tops)),
    setBottoms: bottoms => dispatch(setBottoms(bottoms)),
    setMouth: mouth => dispatch(setMouth(mouth)),
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

  // eslint-disable-next-line
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if(!avatar){
      APIHandler([`getAvatar`, 'jdogg'])
      .then((data) => {
        // console.log(data);
        props.setGender(data.gender.title);
        props.setBase(data.base);
        props.setEyes(data.face.eyes);
        props.setHair(data.hair);
        props.setTops(data.tops);
        props.setBottoms(data.bottoms);
        props.setMouth(data.face.mouths);
      });
    }
  }, [avatar,]);

  return (
    <ThemeProvider theme={theme} >
      <div className={classes.root}>
        <AvatarBuilder />
      </div>
    </ThemeProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
