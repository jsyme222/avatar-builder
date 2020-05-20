import React, { useState, useEffect } from 'react';
import { Container, makeStyles, Divider } from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        details: state.itemDetails
    }
};

function LayerList(props) {
    const [layers, setLayers] = useState(null);
    const [activeLayer, setActiveLayer] = useState(null);
    const useStyles = makeStyles((theme) => ({
        root: {
            minHeight: 50,
        },
        layerBox: {
            margin: 2.5,
            '&:hover': {
                cursor: 'pointer',
            }
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
        activeLayer: {
            transition: 'all 0.35s ease',
            boxShadow: `2px 2px 1px -1px ${theme.palette.secondary.main},0px 1px 1px 0px ${theme.palette.secondary.main},0px 1px 3px 2px ${theme.palette.primary.main}`,
        }
    }));
    const classes = useStyles();

    useEffect(() => {
        let image = props.details.image;
        let layers = [];
        Object.entries(image).map((item) => {
            if(typeof(item[1]) === 'object' && item !== null){
                layers.push(item[1])
            }
        });
        setLayers(layers)
    }, [props.details.image, ]);

    return (
        <Container className={classes.root}>
            <p>Layers</p>
            <Divider />
            <div className={classes.listContainer}>
                {Array.isArray(layers) ?
                    layers.map((layer) => 
                        layer &&
                        <div 
                            className={`${classes.layerBox} ${(layer === activeLayer) && classes.activeLayer}`}
                            onClick={(event) => setActiveLayer(layer)}
                            key={layer.id}
                        >
                            <img src={layer.thumbnail} alt={layer.alt} className={classes.layerImage} />
                        </div>
                    
                    )    
                    :
                    null
                }
            </div>
        </Container>
    )
}

export default connect(mapStateToProps)(LayerList);