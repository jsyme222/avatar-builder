import React from 'react';
import {
    makeStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setAvatar } from '../../redux/actions/index';

const mapStateToProps = state => {
    return {
        layers: state.layers
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
        top: 0,
        left: 0,
    }
}));

const Layers = (props) => {
    const classes = useStyles();
    let layers = props.layers;
    let base = layers.base.image;
    let combined = [<img key={0} src={base} alt={"base"} />, ]
    
    return combined
};

function BuilderAvatar(props) {
    return (
        <Layers layers={props.layers}/>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BuilderAvatar);