import React from 'react';
import {
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        transition: 'all 2s ease',
    }
}));

export default function ItemLayer(props) {
    const classes = useStyles(); 

    return (
        <div className={classes.root} style={props.style}>
            <img 
                src={props.src}
                alt={props.alt}
                />
        </div>
    )
}