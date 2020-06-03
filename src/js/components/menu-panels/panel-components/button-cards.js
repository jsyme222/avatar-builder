import React from 'react';
import {
    makeStyles,
    Grid,
    Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

export function BaseTabButtons(props){
    const dispatch = useDispatch()

    const useStyles = makeStyles((theme) => ({
        buttonInfo: {
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'space-between',
            margin: 15,
        }
    }));
    const classes = useStyles();

    const handleStrip = (event) => {
        dispatch({type: 'SET_LAYERS', payload: []});
        dispatch({ type: 'SET_EQUIPPED', payload: []});
    }

    return (
        <Grid container>
            <Grid item xs={12} className={classes.buttonInfo}>
                <Button variant={"outlined"}>Reset</Button>
                <p>Reset your avatar to the default equipment and settings</p>
            </Grid>
            <Grid item xs={12} className={classes.buttonInfo}>
                <Button variant={"outlined"} onClick={handleStrip}>Strip</Button>
                <p>Who needs clothes anyway!</p>
            </Grid>
        </Grid>
        )
}