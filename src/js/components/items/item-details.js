import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Grid, Divider, Grow, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import GradientList from '../gradients/gradient-list';
import LayerList from '../layers/layer-list';
import { fullURL } from '../../conf';
import { setDetails, setInitialLayer, setPanel } from '../../redux/actions/index';
import { LocalOffer  } from '@material-ui/icons';
import LayerSwitchButtons from '../layers/layer-switch-buttons';

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
        setOpenPanel: panel => dispatch(setPanel(panel)),
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 2.5,
        marginTop: 5,
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
    },
    tabLink: {
        color: theme.palette.primary.main,
        '&:hover': {
            cursor: 'pointer',
        }
    }
}));

function ItemDetails(props) {
    const [details, setDetails] = useState(null);
    const classes = useStyles();

    const StoreLabel = () => {
        return (
            <div className={classes.storeLabel}>
                <LocalOffer />
                <h5>{details.store}</h5>
            </div>
        )
    };

    const TabLink = (props) => {
        const tabs = require('../menu/menu-components/menu-drawer/builder-menu-items.json');
        const handleClick = (tab) => {
            for(let i = 0; i < tabs.length; i++){
                if(tabs[i].title.toUpperCase() === tab){
                    props.setTab(tabs[i])
                }
            }
        };

        return (
            <p className={classes.tabLink} onClick={() => handleClick(props.children)}>{`${props.children} | `}</p>
        )
    };

    useEffect(() => {
        if(Object.entries(props.details).length >= 1){
            setDetails(props.details);
        }
    }, [props.details, ])

    return (
        details &&
            <Grow in={typeof(details) === 'object'} onClose={(event) => setDetails(null)}>
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
                            <LayerSwitchButtons layer={details}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <TabLink setTab={props.setOpenPanel}>{details.category}</TabLink>
                                <p>&nbsp;{details.subcategory || ""} | {(details.gender && (details.gender.title || details.gender)) || "Unisex"}</p>
                            </div>
                            <Divider />
                            <div className={classes.storePreview}>
                                <img src={fullURL(details.image.thumbnail)} alt={details.image.title} className={classes.imagePreview} />
                                <StoreLabel />
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grow>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);