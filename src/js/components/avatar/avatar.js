import React from 'react';
import {
    makeStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setAvatar } from '../../redux/actions/index';
import { fullURL } from '../../conf';

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
    let layers = props.layers;

    function createLayers(layers) {
        /**
         * @param {Array} layers    Contains list of items
         * Loops through layers creating an image tag for each item.
         * If the item has a 'fixed_to' attribute the z-index will be assigned 
         * accordingly. 
         * If the image is composed of different layers then each layer will be
         * decomposed into a seperate img tag.
         */

        function ItemLayer(props) {
            return (
                <div style={{...props.style, position: 'absolute'}}>
                    <img 
                        src={props.src}
                        alt={props.alt}
                        />
                </div>
            )
        }

        let fixedTo = (i) => {
            return {
                'FRONT': 2 * i,
                'BACK': -1,
            }
        };
        let combined = [];
        layers.map(function(l) {
            if(l && l.id){
                if(l.has_layers) {
                    // Loop through layers of item, assigning z-index as needed
                    for(let i = 1; i < 6; i++){
                        let z = fixedTo(combined.length);
                        if(l.image[`layer${i}`]){
                            combined.push(
                                <ItemLayer
                                    key={l.id + `${i * i}`} 
                                    src={fullURL(l.image[`layer${i}`].image)} 
                                    alt={l.alt} 
                                    style={{ zIndex: z[l.image[`layer${i}`].fixed_to] || l.layer }}
                                />
                            )
                        }
                    }
                }else{
                    // No layers were found and assigning item layer as normal
                    combined.push(
                        <ItemLayer
                            key={l.id} 
                            src={fullURL(l.image.image)} 
                            alt={l.alt} 
                            style={{zIndex: l.layer}}
                        />
                    )
                }
            }
            return true
        })
        return combined;
    }

    function buildBase() {
        let base = layers.base;
        let baseLayer = createLayers(base);
        return baseLayer
    }

    function buildTops() {
        let tops = layers.tops;
        let topsLayers = createLayers(tops)
        return topsLayers; 
    }

    function buildBottoms() {
        let bottoms = layers.bottoms;
        let bottomsLayers = createLayers(bottoms)
        return bottomsLayers; 
    }

    function buildHair(){
        let hair = layers.hair;
        let allHairLayers = [];
        hair && Object.entries(hair).length > 0 &&
            Object.entries(hair).map((h) => 
                allHairLayers.push(h[1])
            )
        let combinedLayers = (allHairLayers.length >= 1) ? createLayers(allHairLayers) : []
        return combinedLayers
    }   

    function buildFacialHair(){
        let hair = layers.facialHair;
        let allHairLayers = [];
        Object.entries(hair).length > 0 &&
            Object.entries(hair).map((h) => 
                allHairLayers.push(h[1])
            )
        let combinedLayers = (allHairLayers.length >= 1) ? createLayers(allHairLayers) : []
        return combinedLayers
    }   

    function buildFace(){
        let face = layers.face;
        let allFaceLayers = [];
        face && Object.entries(face).length > 0 &&
            Object.entries(face).map((layer) => 
                allFaceLayers.push(layer[1])
            );
        let combinedLayers =  (allFaceLayers.length >= 1) ? createLayers(allFaceLayers) : []
        return combinedLayers
    }


    return [
        ...buildBase(),
        ...buildTops(),
        ...buildHair(),
        ...buildFacialHair(),
        ...buildBottoms(),
        ...buildFace(),
    ]
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