import React from 'react';
import {
    makeStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setAvatar } from '../../redux/actions/index';

const mapStateToProps = state => {
    return {
        layers: state.layers,
        gender: state.avatar.gender,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setAvatar: avatar => dispatch(setAvatar(avatar)),
    }
}

const useStyles = makeStyles((theme) => ({
    layer: {
        position: "absolute",
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        '& >img': {
            position: 'absolute',
        }
    }
}));

const Layers = (props) => {
    const classes = useStyles();
    let layers = props.layers;
    let layersArray = [
        layers.base,
        layers.top,
        layers.hair,
        layers.bottom,
        layers.accessories,
        layers.face,
    ];
    let combined = [];
    layersArray.map((layer) => {
        if(layer === layers.face) {
            console.log(layer);
            // layer.map((faceItem) => {
            //     Object.entries(faceItem[1]).map((item) => {
            //         console.log(item);
            //         combined.push(
            //             <img 
            //                 key={item.image.image.pk} 
            //                 src={item.image.image} 
            //                 alt={item.alt} 
            //                 className={classes.layer} 
            //                 style={{zIndex: item.layer}}
            //                 />
            //             )
            //             return true
            //     })
            //     return true
            // })
        }
        if(Array.isArray(layer)){
            layer.map((innerLayer) => {
                combined.push(
                    <img 
                        key={innerLayer.image.pk} 
                        src={innerLayer.image.image} 
                        alt={innerLayer.alt} 
                        className={classes.layer} 
                        style={{zIndex: innerLayer.layer}}
                        />
                );
                return true
            })
        }
        else if(Array.isArray(layer.layer)){
            let layers = layer.layer;
            layers.map((innerLayer) => {
                combined.push(
                    <img 
                        key={innerLayer.image.pk} 
                        src={innerLayer.image.image} 
                        alt={innerLayer.alt} 
                        className={classes.layer} 
                        style={{zIndex: innerLayer.layer}}
                        />
                );
                })
        }else{
            combined.push(
                <img 
                    key={layer.image.pk} 
                    src={layer.image.image} 
                    alt={layer.alt} 
                    className={classes.layer} 
                    style={{zIndex: layer.layer}}
                    />
            );
        }
        return true
    });
    
    return combined
};

function BuilderAvatar(props) {
    const classes = useStyles();
    return (
        <div className={classes.avatarContainer}>
            <Layers layers={props.layers}/>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BuilderAvatar);