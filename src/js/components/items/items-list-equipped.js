import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Item from '../items/item';
import { connect } from 'react-redux';
import { setDetails, setAllLayers } from '../../redux/actions/index';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const mapStateToProps = state => {
    return {
        details: state.details,
        layers: state.layers,
        title: state.openPanel.title.toLowerCase(),
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setDetails: details => dispatch(setDetails(details)),
        setAllLayers: layers => dispatch(setAllLayers(layers)),
    }
}

const useStyles = makeStyles((theme) => {
    return {
        equippedItem: {
        }
    }
});

function ItemsListEquipped(props) {
    const [equipped, setEquipped] = useState(null);
    const classes = useStyles();
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };

    const EquippedItems = () => {
        let items = [];
        if(equipped && Array.isArray(equipped)){
            equipped.map((item, index) => {
                items.push(
                        <div className={classes.equippedItem} key={item.id}>
                                        <Item 
                                            item={item} 
                                            onClickAction={() => props.setDetails(item)} 
                                        />
                        </div>
                )
                return true
            })
        }
        return items
    }

    useEffect(() => {
        if(props.equipped && props.equipped.equipped){
            setEquipped(props.equipped.equipped)
        }else{
            let items = [];
            Object.entries(props.layers).map((cat) => {
                Array.isArray(cat[1]) && cat[1].map((item) => {
                    items.push(item)
                    return true
                })
                return true
            })
            setEquipped(items)
        }
        // eslint-disable-next-line
    }, [props.equipped, ]);

       return ( 
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', maxWidth: '100%'  }}>
                <Typography component={"div"}>Equipped {!props.allEquipped && props.title[0].toUpperCase() + props.title.slice(1)}</Typography>
                <div style={{display: 'flex', flexFlow: 'column'}}>
                                <div style={{'display': 'flex', maxWidth: 450, flexFlow: 'row wrap' }}>
                                    <EquippedItems />
                                </div>
                </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsListEquipped);