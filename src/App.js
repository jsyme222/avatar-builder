import React, { useEffect } from 'react';
import {
  createMuiTheme, 
  ThemeProvider,
  makeStyles, 
} from '@material-ui/core';
import AvatarBuilder from './js/components/builder/avatar-builder';
import './App.css';
import SetInitAvatarLayers from './js/custom-hooks/set-init-avatar-layers';
import { connect } from 'react-redux';
import { APIHandler } from './js/conf';
import { setGenderSelections } from './js/redux/actions';

/**
 * Init data is set for the entire redux store in the SetInitAvatarLayers component 
 */

const mapDispatchToProps = dispatch => {
  return {
    setGenderSelections: selections => dispatch(setGenderSelections(selections)),
  }
}

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

  useEffect(() => {
        APIHandler('genders')
        .then((genders) => props.setGenderSelections(genders.results));
  });

  return (
    <ThemeProvider theme={theme} >
      <SetInitAvatarLayers />
      <div className={classes.root}>
        <AvatarBuilder />
      </div>
    </ThemeProvider>
  );
}

export default connect(null, mapDispatchToProps)(App);
