import React from 'react';
import { connect } from 'react-redux';
import { setHair, setFacialhair } from '../../redux/actions/index';
import SetEquipped from '../../custom-hooks/set-equipped';
import SubcategoryPanel from './subcategory-panel';

const mapStateToProps = state => {
    return {
        hair: state.layers.hair,
        facialHair: state.layers.facialHair,
        allHair: [...state.layers.hair, ...state.layers.facialHair],
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setHair: hair => dispatch(setHair(hair)),
        setFacialhair: facialHair => dispatch(setFacialhair(facialHair)),
    }
};

function HairTab(props) {
    const equipped = SetEquipped(props.allHair);

    const SUBCATEGORIES = {
        'HEAD-HAIR': props.setHair,
        'FACIAL-HAIR': props.setFacialhair,
    };

    const handleClick = (obj) => {
        let field = obj.subcategory;
        let data;
        if(equipped.idArray.includes(obj.id)){
            data = []
        }else{
            data = [obj, ]
        }
        SUBCATEGORIES[field](data)
    };

    return (
        <>
            <SubcategoryPanel
                equipped={equipped}
                onClickAction={handleClick}
            />
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(HairTab);