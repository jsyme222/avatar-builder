import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { APIHandler } from '../../conf';
import { setAllLayers, setInitialLayer } from '../../redux/actions/index';
import { connect } from 'react-redux';
import { fullURL } from '../../conf';

/*
"gradient-list"

Lists all possible gradients (color options) for an individual layer.
If the layer has no variant options this component will not render.

When the setNewLayer function is called it creates an entirely new object
and assigns it to the 'layers' state, this re-renders the entire avatar 
with the new layer in place.
*/

const mapStateToProps = state => {
    return {
        layers: state.layers,
        initialLayer: state.initialLayer,
        details: state.itemDetails
    }
};

const mapDsipatchToProps = dispatch => {
    return {
        setAllLayers: layers => dispatch(setAllLayers(layers)),
        setInitialLayer: layer => dispatch(setInitialLayer(layer)),
    }
}

function GradientList(props) {
    const [gradients, setGradients] = useState(null);  // All possible gradients (color options) 
    const [activeGradient, setActiveGradient] = useState(null);  // The currently selected gradient
    const [item, setItem] = useState(null);  // The selected item to display gradients for
    const useStyles = makeStyles((theme) => ({
        root: {
            minHeight: 50,
            display: 'flex',
        },
        gradientBox: {
            height: 25,
            width: 25,
            margin: 2.5,
            transition: 'all 0.25s ease',
            '&:hover': {
                cursor: 'pointer',
            }
        },
        listContainer: {
            display: 'flex',
        },
        activeGradient: {
            transition: 'all 0.25s ease',
            boxShadow: `2px 2px 1px -1px ${theme.palette.secondary.main},0px 1px 1px 0px ${theme.palette.secondary.main},0px 1px 3px 2px ${theme.palette.primary.main}`,
        }
    }));
    const classes = useStyles();

    const setNewLayer = (layer) => {
        let layers = props.layers;  // All layers stored in redux store
        let variant = layer.variant_of; // Variant layer ID if layer is a variant
        let cat = props.details.category;  // Category of the currently displayed details item
        layers[cat.toLowerCase()].map((field) => { // Map the layers matching 'cat'
            for(let i = 1; i <= 5; i++){
                let layerImage = field.image[`layer${i}`];
                if(layerImage && ((layerImage.id === variant) || (layerImage.variant_of === variant))){
                    /*
                    If the current layer id || variant_of id matches the 'variant' then we 
                    have found the appropriate image layer to switch out.
                    */
                    let l = layers;  // All initial layers, we will update the store with an entirely new object.
                    if(!field.image[`layer${i + 1}`]){  // Check for any more layers
                        field.image.image = layer.image
                    }
                    let image = layer.image;
                    layer.image = fullURL(image);  // Image url prepared from the 'layer' parameter
                    console.log(l[cat.toLowerCase()]);
                    l[cat.toLowerCase()][0].image[`layer${i}`] = layer;  // Assign new layer to old layer position
                    props.setAllLayers(l);  // Set all the layers with the new object
                }
            }
            return true
        })
    };

    const onClickAction = (layerOption) => {

        function findLayer() {
            let returnLayer = layerOption;
            if(props.details.image){
                for(let x=1; x<=5; x++){
                    let layer = props.details.image[`layer${x}`]
                    if(layer && (layer.id === layerOption.variant_of)){ // Find variant layer
                        returnLayer = layer // return original variant layer
                    }
                }
            }
            return returnLayer
        }
        if(activeGradient && (layerOption.id === activeGradient.id)){
            setActiveGradient(null);
            setNewLayer(props.initialLayer)
        }else{
            let layer = findLayer()
            props.setInitialLayer(layer);
            setActiveGradient(layerOption);
            setNewLayer(layerOption)
        }
    }

    useEffect(() => {
        if(props.item) {
            setItem(props.item)
        }
    }, [props.item, ]);

    useEffect(() => {
        if(item){
            APIHandler(['options', item.id])
            .then(gradients => {
                let d = gradients;
                setGradients(d)});
        }
    }, [item, ]);

    useEffect(() => {
        if(!activeGradient){
            if(item && item.variant_of) {
                console.log(item)
                setActiveGradient(item)
            }
        }
    }, [activeGradient, item]);

    return (
        <Container className={classes.root}>
                {Array.isArray(gradients) ?
                    gradients.map((option) => 
                        <div 
                            key={option.id}
                            style={{background: option.color}}
                            className={`${classes.gradientBox} ${(option === activeGradient) && classes.activeGradient}`}
                            onClick={(event) => onClickAction(option)}
                        >
                        </div>
                    )    
                    :
                    null
                }
        </Container>
    )
}

export default connect(mapStateToProps, mapDsipatchToProps)(GradientList);