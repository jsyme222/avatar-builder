import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { APIHandler } from '../../conf';
import { setAllLayers, setInitialLayer, setEquipped } from '../../redux/actions/index';
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
        details: state.itemDetails,
        equippedState: state.equipped,
    }
};

const mapDsipatchToProps = dispatch => {
    return {
        setAllLayers: layers => dispatch(setAllLayers(layers)),
        setInitialLayer: layer => dispatch(setInitialLayer(layer)),
        setEquipped: equipped => dispatch(setEquipped(equipped)),
    }
}

function GradientList(props) {
    const [gradients, setGradients] = useState(null);  // All possible gradients (color options) 
    const [activeGradient, setActiveGradient] = useState(null);  // The currently selected gradient
    const [item, setItem] = useState(null);  // The selected item to display gradients for
    const [equipped, setEquipped] = useState(null);
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
        let variant = layer.variant_of || layer.id; // Variant layer ID if layer is a variant
        let cat = props.details.category.toLowerCase();  // Category of the currently displayed details item
        layers[cat].map((field) => { // Map the layers matching 'cat'
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
                    if(l[cat].length >= 1){  // Make sure category has items
                        l[cat].map((l) => {
                            if(l.id === field.id){  
                                /*
                                If the id of the item=>l matches the id of the item=>field then the layer will be swapped correctly.
                                This ensures that if the item category has multiple items inside the layer will not be swapped
                                unless it is the crredct item.
                                */
                               let initLayer = l.image[`layer${i}`];
                               let loseInitLayer = equipped.filter((layer) => layer !== initLayer);
                                l.image[`layer${i}`] = layer  // Assign new layer to old layer position
                                loseInitLayer.push(layer);
                                props.setEquipped(loseInitLayer)
                            }
                            return true;
                        })
                    }
                    props.setAllLayers(l);  // Set all the layers with the new object
                }
            }
            return true
        })
    };

    function findInitLayer(layerOption) {
        /*
        Finds the initial layer to store in the 'initalLayer' state.
        This creates the possibility of swapping any gradient version 
        of a layer with the original greyscale image.
        */
        let initLayer = layerOption;
        if(props.details.image){
            for(let x=1; x<=5; x++){
                let layer = props.details.image[`layer${x}`]
                if(layer && (layer.id === layerOption.variant_of)){ // Find variant layer
                    initLayer = layer // return original variant layer
                }
            }
        }
        return initLayer
    }

    const onClickAction = (layerOption) => {
        /*
        Sets the initalLayer state if adding a variant layer
        then swaps layers, if removing a varaint layer it will
        swap the layer with greyscale initalLayer
        */

        if(activeGradient && (layerOption.id === activeGradient.id)){
            setActiveGradient(null);
            setNewLayer(props.initialLayer);
        }else{
            let layer = findInitLayer(layerOption)  // The initial greyscale of the layer
            props.setInitialLayer(layer);  // Greyscale now accessible
            setActiveGradient(layerOption);
            setNewLayer(layerOption)
        }
    }

    useEffect(() => {
        setEquipped(props.equipped ? props.equipped : props.equippedState)
    }, [props.equipped, props.equippedState]);

    useEffect(() => {
        if(props.item) {
            setItem(props.item)
        }
    }, [props.item, ]);

    useEffect(() => {
        // Grab layer variants/"gradients" for the selected item
        if(item){
            APIHandler(['options', item.id])
            .then(gradients => {
                let d = gradients;
                setGradients(d)});
        }
    }, [item, ]);

    const GradientOptions = () => {
        let grads = [];
        Array.isArray(gradients) ?
                    gradients.map((option) => {
                        grads.push(
                            <div 
                                key={option.id}
                                style={{background: option.color}}
                                className={`${classes.gradientBox} ${((equipped.includes(option)) || (option === activeGradient)) && classes.activeGradient}`}
                                onClick={(event) => onClickAction(option)}
                            >
                            </div>
                        )
                        return true
                    }
                    )    
                    :
                    grads = <p>No options</p>
        return grads
    };
    
    return (
        <Container className={classes.root}>
            {console.log(props.item)}
                <GradientOptions />
        </Container>
    )
}

export default connect(mapStateToProps, mapDsipatchToProps)(GradientList);