import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { APIHandler } from '../../conf';
import { setAllLayers } from '../../redux/actions/index';
import { connect } from 'react-redux';
import { fullURL } from '../../conf';

const mapStateToProps = state => {
    return {
        layers: state.layers,
        details: state.itemDetails
    }
};

const mapDsipatchToProps = dispatch => {
    return {
        setAllLayers: layers => dispatch(setAllLayers(layers)),
    }
}

function GradientList(props) {
    const [gradients, setGradients] = useState(null);
    const [activeGradient, setActiveGradient] = useState(null);
    const [item, setItem] = useState(null);
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
        let layers = props.layers;
        let variant = layer.variant_of;
        let cat = props.details.category;
        layers[cat.toLowerCase()].map((field) => {
            for(let i = 1; i <= 5; i++){
                let layerImage = field.image[`layer${i}`];
                if(layerImage && ((layerImage.id === variant) || (layerImage.variant_of === variant))){
                    let l = layers;
                    if(!field.image[`layer${i + 1}`]){
                        field.image.image = layer.image
                    }
                    let image = layer.image;
                    layer.image = fullURL(image);
                    l[cat.toLowerCase()][0].image[`layer${i}`] = layer;
                    props.setAllLayers(l);
                }
            }
            return true
        })
    };

    const onClickAction = (layerOption) => {
        if(activeGradient && (layerOption.id === activeGradient.id)){
            setActiveGradient(null);
            setNewLayer(layerOption)
        }else{
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