import React, { useState, useEffect } from 'react';
import { Container, makeStyles, Divider, IconButton } from '@material-ui/core';
import { Palette, ArrowBack } from '@material-ui/icons';
import { connect } from 'react-redux';
import GradientList from '../gradients/gradient-list';
import { setInitialLayer } from '../../redux/actions/index';
import { fullURL } from '../../conf';

/*
"layer-list"

Lists all layers for the current item if the layer has variant layers 
(there are alternate forms of the layer) otherwise the list will appear blank.
This component will render the "gradient-list" component once a layer is selected.

If an item is selected that has only (1) one single layer, this component will be
skipped and the item will be sent directly to the "gradient-list" component to display
options if it has variant layers.
*/

const mapStateToProps = state => {
    return {
        details: state.itemDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setInitialLayer: layer => dispatch(setInitialLayer(layer)),
    }
};
    
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 50,
    },
    layerBox: {
        alignSelf: 'center',
        margin: 2.5,
        maxWidth:75,
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
    const [layers, setLayers] = useState(null);  // All layers with variant layers
    const [activeLayer, setActiveLayer] = useState(null);  // Defines active layer - to be styled
    const [showGradientList, setShowGradientList] = useState(false);  // When true will show "gradient-list" for activeLayer
    const [theseOptions, setTheseOptions] = useState(null);  // Send the gradient options from the activeLayer to the "gradient-list"
    const classes = useStyles();

    const viewGradientOptions = (layer) => {  // Prepares "gradient-list" for gradient options
        // props.setInitialLayer(layer);
        setTheseOptions(layer);
        setShowGradientList(!showGradientList)
    };

    useEffect(() => {  // Takes item image and layers and sets state accordingly
        let image = props.details.image;
        let layers = [];
        Object.entries(image).map((item) => {
            if(item && typeof(item[1]) === 'object'){
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
                        layer && layer.has_gradients &&
                            <div 
                                className={`${classes.layerBox} ${(layer === activeLayer) && classes.activeLayer}`}
                                onClick={(event) => setActiveLayer(layer)}
                                key={layer.id}
                            >
                                <img src={fullURL(layer.thumbnail)} alt={layer.alt} className={classes.layerImage} />
                                <IconButton className={classes.editButton} color={"primary"} onClick={(event) => viewGradientOptions(layer)}>
                                    <Palette />
                                </IconButton>
                            </div>
                    )    
                    :
                    null
                    :
                    <GradientList item={theseOptions} equipped={props.equipped}/>
                }
            </div>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerList);