import React from 'react';
import { connect } from 'react-redux';
import { setBottoms } from '../../redux/actions/index';
import SetEquipped from '../../custom-hooks/set-equipped';
import SubcategoryPanel from './subcategory-panel';

const mapStateToProps = state => {
    return {
        bottoms: state.layers.bottoms,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setBottoms: bottoms => dispatch(setBottoms(bottoms)),
    }
};

function BottomsTab(props) {
    const equipped = SetEquipped(props.bottoms);

    const handleClick = (obj) => {
        if(equipped.idArray.includes(obj.id)){
            let bottoms = props.bottoms.filter(bottom => bottom.id !== obj.id)
            props.setBottoms(bottoms)
        }else{
            // #TODO Assign top by z-index, layer by array index?? or subcategory??
            props.setBottoms([...props.bottoms, obj])
        }
    };

    return (
        <SubcategoryPanel
            equipped={equipped}
            onClickAction={handleClick}
        />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomsTab);