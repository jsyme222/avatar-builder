import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    baseOptionContainer: {
        margin: 10,
        padding: 5,
        transition: 'all 1 ease',
        '&:hover': {
            cursor: 'pointer',
            background: 'grey',
            '& >img': {
                padding: 0,
            }
        }
    },
    baseOptionImage: {
        height: 100,
    }
}))

function Item(props) {
    const classes = useStyles();

    return (
        <Paper
            className={classes.baseOptionContainer} 
            onClick={() => props.onClickAction()}
            key={props.item.id}
        >
            <img src={props.item.image.thumbnail || props.item.image.image} alt={props.item.alt} className={classes.baseOptionImage} />
        </Paper>
    )
}

export default Item;