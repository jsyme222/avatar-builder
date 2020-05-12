import React, { useState, useEffect } from 'react';
import Item from './item';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        gender: state.avatar.gender,
    }
}

function ItemsList(props) {
    const [gender, setGender] = useState(null);
    const [equipped, setEquipped] = useState([]);

    useEffect(() => {
        if(props.equipped){
            setEquipped(props.equipped.idArray)
        }
    }, [props.equipped, ]);

    useEffect(() => {
        if(props.selectedGender){
                setGender(props.selectedGender)
            }else if(props.gender){
                setGender(props.gender)
            }
    }, [props.selectedGender, props.gender]);
    
    return (
        <>
        {props.items.length >= 1 ?
            props.items.map((option) => 
                (!option.gender || ((option.gender.title || option.gender) === gender)) ?
                    <div key={option.id}>
                        <Item item={option} onClickAction={props.onClickAction} equipped={() => equipped.includes(option.id)} />
                    </div>
                    : null
                )
            :
            <p>No Items Available</p>
            }
        </>
    )
}

ItemsList.propTypes = {
    items: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(ItemsList);