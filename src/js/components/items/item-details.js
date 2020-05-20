import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Grid, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import GradientList from '../gradients/gradient-list';
import LayerList from '../layers/layer-list';
import { fullURL } from '../../conf';

const mapStateToProps = state => {
    return {
        details: state.itemDetails,
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 2.5,
        // boxShadow: `1px 1px 0px 0px #232323,0px 1px 1px 0px #232323,-2px 1px 5px 1px ${theme.palette.primary.main}`,
        fontSize: '0.7rem',
        
    },
    imagePreview: {
        maxHeight: 30,
        margin: 5,
    }
}));

function ItemDetails(props) {
    const [details, setDetails] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        if(Object.entries(props.details).length >= 1){
            setDetails(props.details);
        }
    }, [props.details, ])

    return (
        details &&
            <Paper className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        {!details.has_layers ?
                            <GradientList />
                            :
                            <LayerList />
                        }
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <p><b>{details.title}</b></p>
                        <Divider />
                        <p>{details.description}</p>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <p>{details.category} | {details.subcategory || ""} | {(details.gender && details.gender.title) || "Unisex"}</p>
                        <Divider />
                        <img src={fullURL(details.image.thumbnail)} alt={details.image.title} className={classes.imagePreview} />
                    </Grid>
                </Grid>
            </Paper>
    )
}

export default connect(mapStateToProps)(ItemDetails);