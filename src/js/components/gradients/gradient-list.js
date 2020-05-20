import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { APIHandler } from '../../conf';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        layers: state.layers
    }
};

function GradientList(props) {
    const [gradients, setGradients] = useState(null);
    const [activeGradient, setActiveGradient] = useState(null);
    const [item, setItem] = useState(null);
    const useStyles = makeStyles((theme) => ({
        root: {
            minHeight: 50,
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
        // Object.entries(layers).map((layer) => {
        //     layer.map((l) => {
        //         if(Array.isArray(l)){
        //             l.map(((innerLayer) => {
        //                 Object.entries(innerLayer.image).map((imageField) => {
        //                     if(typeof(imageField) === 'object'){
        //                         Object.entries(imageField).map((imageLayer) => {
        //                             if(imageLayer[1]){
        //                                 let id = imageLayer[1]
        //                                 if(activeGradient){
        //                                     console.log(activeGradient)
        //                                 }
        //                             }
        //                         })
        //                     }
        //                 })
        //             }))
        //         }
        //     })
        // })
    };

    const onClickAction = (layerOption) => {
        if(activeGradient && (layerOption.id === activeGradient.id)){
            setActiveGradient(null)
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
            APIHandler(['options', item])
            .then(gradients => setGradients(gradients))
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
                            {console.log(props.layers)}
                        </div>
                    )    
                    :
                    null
                }
        </Container>
    )
}

export default connect(mapStateToProps)(GradientList);