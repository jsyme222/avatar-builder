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

        let combined = []; // Returned value

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

        const fixedTo = (i) => {
            return {
                'FRONT': 2 * i,
                'BACK': 0,
            }
        };

        function layerLoop(l) {
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
        }

        Array.isArray(layers) && layers.map(l => layerLoop(l));

        return combined;
    }

    function combineLayers(layers){
        let allItemLayers = [];
        layers && Array.isArray(layers) &&
            layers.map((layer) => 
                allItemLayers.push(layer)
            );
        let combinedLayers =  (allItemLayers.length >= 1) ? createLayers(allItemLayers) : []
        return combinedLayers
    }

    function buildBase() {
        let base = layers.base;
        let baseLayer = createLayers(base);
        return baseLayer
    }

    function buildFace() {
        let face = layers.face;
        let combinedLayers =  combineLayers(face)
        return combinedLayers
    }

    function buildTops() {
        let tops = layers.tops;
        let combinedLayers =  combineLayers(tops);
        return combinedLayers
    }

    function buildBottoms() {
        let bottoms = layers.bottoms;
        let combinedLayers = combineLayers(bottoms);
        return combinedLayers
    }

    function buildHats() {
        let hats = layers.hats;
        let hatsLayers = createLayers(hats)
        return hatsLayers; 
    }
    function buildFacialHair(){
        let hair = layers.hair;
        let payload = [];
        if(Array.isArray(hair)){
            hair.map((h) => {
                h.subcategory === 'FACIAL-HAIR' &&
                    payload.push(h)
                return true;
            })
        }
        let combinedLayers = combineLayers(payload)
        return combinedLayers
    }   

    function buildHair(){
        let hair = layers.hair;
        let payload = [];
        if(Array.isArray(hair)){
            hair.map((h) => {
                h.subcategory === 'HEAD-HAIR' &&
                    payload.push(h)
                return true;
            })
        }
        let combinedLayers = combineLayers(payload)
        return combinedLayers
    }   

    return [
        ...buildBase(),
        ...buildTops(),
        ...buildHair(),
        ...buildFacialHair(),
        ...buildBottoms(),
        ...buildFace(),
        ...buildHats(),
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