import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Grid, Divider, IconButton, Grow } from '@material-ui/core';
import  HighlightOff from '@material-ui/icons/HighlightOff';
import { connect } from 'react-redux';
import GradientList from '../gradients/gradient-list';
import LayerList from '../layers/layer-list';
import { fullURL } from '../../conf';
import { setDetails } from '../../redux/actions/index';

const mapStateToProps = state => {
    return {
        details: state.itemDetails,
        title: state.openPanel.title,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDetails: details => dispatch(setDetails(details)),
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 2.5,
        // boxShadow: `1px 1px 0px 0px #232323,0px 1px 1px 0px #232323,-2px 1px 5px 1px ${theme.palette.primary.main}`,
        fontSize: '0.7rem',
        
    },
    imagePreview: {
        maxHeight: 30,
        margin: 5,
    },
    closeButton: {
        position: 'absolute',
        padding: 1,
    }
}));

function ItemDetails(props) {
    const [details, setDetails] = useState(null);
    const classes = useStyles();
    let matchedDetailTOTitle = props.details.category && (props.details.category === props.title.toUpperCase())

    const resetDetails = () => {
        setDetails(null);
        props.setDetails({})
    };

    useEffect(() => {
        if(Object.entries(props.details).length >= 1){
            console.log(props.details)
            if(matchedDetailTOTitle){
                setDetails(props.details);
            }else{
                resetDetails()
            }
        }
    }, [props.details, matchedDetailTOTitle])

    return (
        details &&
            <Grow in={details} onClose={(event) => setDetails(null)}>
                <Paper className={classes.root}>
                    <Grid container style={{position: 'relative'}}>
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
                        <IconButton className={classes.closeButton} onClick={(event) => resetDetails()}>
                            <HighlightOff />
                        </IconButton>
                    </Grid>
                </Paper>
            </Grow>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);