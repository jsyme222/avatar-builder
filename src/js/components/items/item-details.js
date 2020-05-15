import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Grid, Divider } from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        details: state.itemDetails,
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        fontSize: '0.7rem',
    }
}));

function ItemDetails(props) {
    const [details, setDetails] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        if(Object.entries(props.details).length >= 1){
            setDetails(props.details)
        }
    }, [props.details, ])

    return (
        details &&
            <Paper className={classes.root}>
                {console.log(details)}
                <Grid container>
                    <Grid item lg={4}>
                        <p><b>{details.title}</b></p>
                        <Divider />
                        <p>{details.description}</p>
                    </Grid>
                    <Grid item lg={4}>
                        <p>{details.category} | {(details.gender && details.gender.title) || "Unisex"}</p>
                        <Divider />
                    </Grid>
                    <Grid item lg={4}>
                        
                    </Grid>
                </Grid>
            </Paper>
    )
}

export default connect(mapStateToProps)(ItemDetails);