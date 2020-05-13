import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fullURL } from '../../conf';

const useStyles = makeStyles((theme) => ({
    baseOptionContainer: {
        margin: 10,
        padding: 5,
        transition: 'all 0.5 ease',
        '&:hover': {
            cursor: 'pointer',
            background: '#f0efed',
            '& >img': {
                padding: 0,
            }
        },
        '&:active': {
            background: 'initial'
        }
    },
    baseOptionImage: {
        height: 100,
    },
    baseOptionEquipped: {
        margin: 10,
        padding: 5,
        boxShadow: `2px 2px 10px -10px ${theme.palette.primary.main},0px 1px 1px 0px ${theme.palette.primary.main},0px 1px 3px 7px ${theme.palette.secondary.main}`,
        '&:hover': {
            cursor: 'pointer',
            background: '#f0efed',
            '& >img': {
                padding: 0,
            }
        },
    }
}))

function Item(props) {
    const [equipped, setEquipped] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if(props.equipped){
            setEquipped(props.equipped)
        }
    }, [props.equipped, ]);

    return (
        <Paper
            className={equipped ? classes.baseOptionEquipped : classes.baseOptionContainer} 
            onClick={(event) => props.onClickAction(props.item)}
            key={props.item.id}
        >
            <img src={fullURL(props.item.image.thumbnail || props.item.image.image)} alt={props.item.alt} className={classes.baseOptionImage} />
        </Paper>
    )
}

export default Item;