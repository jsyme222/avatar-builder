import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Grid, Divider, Grow } from '@material-ui/core';
// import  HighlightOff from '@material-ui/icons/HighlightOff';
import { connect } from 'react-redux';
import GradientList from '../gradients/gradient-list';
import LayerList from '../layers/layer-list';
import { fullURL } from '../../conf';
import { setDetails, setInitialLayer } from '../../redux/actions/index';
import { LocalOffer } from '@material-ui/icons';

const mapStateToProps = state => {
    return {
        details: state.itemDetails,
        title: state.openPanel.title,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDetails: details => dispatch(setDetails(details)),
        setInitialLayer: layer => dispatch(setInitialLayer(layer)),
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 2.5,
        marginTop: 5,
        // boxShadow: `1px 1px 0px 0px #232323,0px 1px 1px 0px #232323,-2px 1px 5px 1px ${theme.palette.primary.main}`,
        fontSize: '0.7rem',
    },
    storePreview: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
    },
    storeLabel: {
        display: 'flex',
        alignItems: 'center',
    },
    imagePreview: {
        maxHeight: 30,
        margin: 5,
    },
    closeButton: {
        position: 'absolute',
        left: 0,
        top: -25,
        padding: 1,
    }
}));

function ItemDetails(props) {
    const [details, setDetails] = useState(null);
    const classes = useStyles();
    let matchedDetailToTitle = props.details.category && (props.details.category.toUpperCase() === props.title.toUpperCase())

    const resetDetails = () => {
        setDetails(null);
        // props.setDetails({})
    };

    const StoreLabel = () => {
        return (
            <div className={classes.storeLabel}>
                <LocalOffer />
                <h5>{details.store}</h5>
            </div>
        )
    };

    useEffect(() => {
        if(Object.entries(props.details).length >= 1){
            if(matchedDetailToTitle){
                setDetails(props.details);
            }else{
                resetDetails()
            }
        }
    }, [props.details, matchedDetailToTitle])

    return (
        details &&
            <Grow in={matchedDetailToTitle} onClose={(event) => setDetails(null)}>
                {/* {console.log(details)} */}
                <Paper className={classes.root}>
                    <Grid container style={{position: 'relative'}}>
                        <Grid item xs={12} sm={4}>
                            {!details.has_layers ?
                                <GradientList item={details}/>
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
                            <p>{details.category} | {details.subcategory || ""} | {(details.gender && (details.gender.title || details.gender)) || "Unisex"}</p>
                            <Divider />
                            <div className={classes.storePreview}>
                                <img src={fullURL(details.image.thumbnail)} alt={details.image.title} className={classes.imagePreview} />
                                <StoreLabel />
                            </div>
                        </Grid>
                        {/* <IconButton className={classes.closeButton} onClick={(event) => resetDetails()}>
                            <HighlightOff />
                        </IconButton> */}
                    </Grid>
                </Paper>
            </Grow>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);