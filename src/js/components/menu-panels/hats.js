import React from 'react';
import { connect } from 'react-redux';
import { setHats } from '../../redux/actions/index';
import SetEquipped from '../../custom-hooks/set-equipped';
import SubcategoryPanel from './subcategory-panel';

const mapStateToProps = state => {
    return {
        hats: state.layers.hats,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setHats: hats => dispatch(setHats(hats)),
    }
};

function HatsTab(props) {
    const equipped = SetEquipped(props.hats);

    const handleClick = (obj) => {
        if(equipped.idArray.includes(obj.id)){
            let hats = props.hats.filter(hat => hat.id !== obj.id)
            props.setHats(hats)
        }else{
            // #TODO Assign top by z-index, layer by array index?? or subcategory??
            props.setHats([...props.hats, obj])
        }
    };

    return (
        <SubcategoryPanel
            equipped={equipped}
            onClickAction={handleClick}
        />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(HatsTab);