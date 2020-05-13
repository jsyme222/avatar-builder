import React from 'react';
import { connect } from 'react-redux';
import { 
    setFace,
    setEyebrows,
    setEyes,
    setMouth,
    setNose,
} from '../../redux/actions/index';
import SetEquipped from '../../custom-hooks/set-equipped';
import SubcategoryPanel from './subcategory-panel';

const mapStateToProps = state => {
    return {
        title: state.openPanel.title,
        gender: state.avatar.gender,
        eyebrows: state.layers.face.eyebrows,
        eyes: state.layers.face.eyes,
        nose: state.layers.face.nose,
        mouth: state.layers.face.mouth,
        face: [
            state.layers.face.eyebrows,
            state.layers.face.eyes,
            state.layers.face.nose,
            state.layers.face.mouth,
        ],
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setFace: face => dispatch(setFace(face)),
        setEyebrows: eyebrows => dispatch(setEyebrows(eyebrows)),
        setEyes: eyes => dispatch(setEyes(eyes)),
        setMouth: mouth => dispatch(setMouth(mouth)),
        setNose: nose => dispatch(setNose(nose)),
    }
};

function FaceTab(props) {
    const equipped = SetEquipped(props.face);
    const SUBCATEGORIES = {  // Subcategories are plural as they were recieved within an array
        'EYEBROWS': props.setEyebrows,
        'EYES': props.setEyes,
        'NOSES': props.setNose,
        'MOUTHS': props.setMouth
    };

    const handleClick = (obj) => {
        let field = obj.subcategory;
        let data;
        if(equipped.idArray.includes(obj.id)){
            data = {}
        }else{
            data = obj
        }
        SUBCATEGORIES[field](data)
    };

    return (
        <SubcategoryPanel
            equipped={equipped}
            onClickAction={handleClick}
        />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceTab);