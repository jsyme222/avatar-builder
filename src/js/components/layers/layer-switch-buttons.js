import React, { useState, useEffect } from 'react';
import { ButtonGroup, IconButton } from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { setAllLayers } from '../../redux/actions/index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        title: state.openPanel.title.toLowerCase(),
        details: state.itemDetails,
        layers: state.layers,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setAllLayers: layers => dispatch(setAllLayers(layers)),
    }
};

function LayerSwitchButtons(props) {
    const [layer, setLayer] = useState(null);

    const handleClick = (item, direction) => {
        if(props.layers && props.layers[item.category.toLowerCase()]){
            let currentLayers = props.layers;
            currentLayers[props.title].map((layer) => {
                let i = layer['layer'];
                if(layer.id === item.id){
                    switch(direction){
                        case 'up':
                            layer['layer'] = i < 12 ? i + 1 : 12;
                            break;
                        default:
                            layer['layer'] = i > 0 ? i -1 : 0;
                            break;
                    }
                }
                return true
            })
            props.setAllLayers(currentLayers);
        }
    };

    useEffect(() => {
        setLayer(props.layer)
    }, [props.layer, ]);

    return (
        <ButtonGroup color={"primary"} aria-label="layer control button group">
            <IconButton onClick={() => handleClick(layer, 'up')}>
                <ArrowUpward />
            </IconButton>
            <IconButton onClick={() => handleClick(layer, 'down')}>
                <ArrowDownward />
            </IconButton>
        </ButtonGroup>
        )
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerSwitchButtons);