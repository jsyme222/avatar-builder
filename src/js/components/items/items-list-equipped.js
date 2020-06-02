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

    function onDragEnd(result) {
        if(props.layers && props.layers[props.title]){
            let currentLayers = props.layers;
            currentLayers[props.title].map((layer) => {
                if(layer.id === result.draggableId){
                    console.log(layer);
                    layer['layer'] = result.destination.index
                    console.log(layer['layer']);
                }else{
                    layer['layer'] = layer['layer'] - 1
                }
                return true
            })
            props.setAllLayers(currentLayers);
        }
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }
        
        const eq = reorder(
            equipped,
            result.source.index,
            result.destination.index
        );

        setEquipped(eq);
    }

    const EquippedItems = () => {
        let items = [];
        if(equipped && Array.isArray(equipped)){
            equipped.map((item, index) => {
                items.push(
                        <div className={classes.equippedItem} key={item.id}>
                            <Draggable draggableId={item.id} index={index}>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Item 
                                            item={item} 
                                            onClickAction={() => props.setDetails(item)} 
                                        />
                                  </div>
                                )}
                            </Draggable>
                                                </div>
                )
                return true
            })
        }
        // console.log(items)
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Typography component={"div"}>Equipped {!props.allEquipped ? props.title[0].toUpperCase() + props.title.slice(1) : 'All'}</Typography>
                <DragDropContext onDragEnd={onDragEnd}> 
                    <Droppable droppableId="droppable" >
                        {provided => (
                            <div style={{'display': 'flex', 'padding': 40 }} ref={provided.innerRef} {...provided.droppableProps}>
                                <EquippedItems />
                                {provided.placeholder}
                            </div>
                        )}

                    </Droppable>
                </DragDropContext>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsListEquipped);