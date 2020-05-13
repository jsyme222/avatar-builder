import React from 'react';
import { connect } from 'react-redux';
import SetEquipped from '../../custom-hooks/set-equipped';
import SubcategoryPanel from '../menu-panels/subcategory-panel';
import { setTops } from '../../redux/actions/index';

const mapStateToProps = state => {
    return {
        tops: state.layers.tops,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTops: tops => dispatch(setTops(tops)),
    }
}

function TopsTab(props) {
    const equipped = SetEquipped(props.tops);

    const handleClick = (clickedTop) => {
        if(equipped.idArray.includes(clickedTop.id)){
            let tops = props.tops.filter(top => top.id !== clickedTop.id)
            props.setTops(tops)
        }else{
            // #TODO Assign top by z-index, layer by array index?? or subcategory??
            props.setTops([...props.tops, clickedTop])
        }
    };

    return (
        <SubcategoryPanel
            equipped={equipped}
            onClickAction={handleClick}
        />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TopsTab);