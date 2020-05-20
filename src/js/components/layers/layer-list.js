import React, { useState, useEffect } from 'react';
import { Container, makeStyles, Divider, IconButton } from '@material-ui/core';
import { Palette, ArrowBack } from '@material-ui/icons';
import { connect } from 'react-redux';
import GradientList from '../gradients/gradient-list';

const mapStateToProps = state => {
    return {
        details: state.itemDetails
    }
};
    
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 50,
    },
    layerBox: {
        position: 'relative',
        alignSelf: 'center',
        margin: 2.5,
    },
    layerImage: {
        maxHeight: 55,
        width: 'auto',
        margin: 5
    },
    listContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        height: '100%'
    },
}));

function LayerList(props) {
    const [layers, setLayers] = useState(null);
    const [activeLayer, setActiveLayer] = useState(null);
    const [showEditButton, setShowEditButton] = useState(false);
    const [showGradientList, setShowGradientList] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        let image = props.details.image;
        let layers = [];
        Object.entries(image).map((item) => {
            if(item != null && typeof(item[1]) === 'object'){
                layers.push(item[1])
            }
            return true;
        });
        setLayers(layers)
    }, [props.details.image, ]);

    return (
        <Container className={classes.root}>
            {!showGradientList ? 
                <p>Layers</p> 
                : 
                <IconButton onClick={(event) => setShowGradientList(!showGradientList)}>
                    <ArrowBack />
                </IconButton>
                }
            <Divider />
            <div className={classes.listContainer}>
                {!showGradientList ?
                    Array.isArray(layers) ?
                    layers.map((layer) => 
                        layer && 
                            <div 
                                className={`${classes.layerBox} ${(layer === activeLayer) && classes.activeLayer}`}
                                onClick={(event) => setActiveLayer(layer)}
                                onMouseOver={(event) => setShowEditButton(!showEditButton)}
                                key={layer.id}
                            >
                                <img src={layer.thumbnail} alt={layer.alt} className={classes.layerImage} />
                                <IconButton className={classes.editButton} color={"primary"} onClick={(event) => setShowGradientList(!showGradientList)}>
                                    <Palette />
                                </IconButton>
                            </div>
                    )    
                    :
                    null
                    :
                    <GradientList />
                }
            </div>
        </Container>
    )
}

export default connect(mapStateToProps)(LayerList);