import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fullURL } from '../../conf';

const useStyles = makeStyles((theme) => ({
    baseOptionContainer: {
        margin: 10,
        padding: 5,
        transition: 'all 0.25 ease',
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
        height: 50,
        maxWidth: 100,
    },
    smallOptionImage: {
        maxHeight: 15,
        maxWidth: 50,
    },
    baseOptionEquipped: {
        margin: 10,
        padding: 10,
        background: 'rgba(0, 0, 0, 0.15)',
        boxShadow: `2px 2px 10px -10px ${theme.palette.primary.main},0px 1px 1px 0px ${theme.palette.primary.main},0px 1px 3px 7px ${theme.palette.secondary.main}`,
        '& >img': {
        },
        '&:hover': {
            cursor: 'pointer',
            '& >img': {
                padding: 'initial',
            }
        },
    }
}))

function Item(props) {
    const [equipped, setEquipped] = useState(false);
    const [useClassName, setUseClassName] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        if(props.equipped){
            setEquipped(props.equipped)
        }
    }, [props.equipped, ]);

    useEffect(() => {
        const getClassName = (src) => {
            let image = new Image();
            image.src = src;
            image.onload = function() {
                let w = this.width;
                let h = this.height;
                if(Math.max(w, h) < 50 ){
                    setUseClassName(classes.smallOptionImage);
                }else{
                    setUseClassName(classes.baseOptionImage);
                }
            }
            return true
        }
        if(!useClassName){
            setUseClassName(getClassName(props.item.image.thumbnail))
        }
    }, [])

    return (
        <Paper
            className={equipped ? classes.baseOptionEquipped : classes.baseOptionContainer} 
            onClick={(event) => props.onClickAction(props.item)}
            key={props.item.id}
        >
            <img src={fullURL(props.item.image.thumbnail || props.item.image.image)} alt={props.item.alt} className={useClassName} />
        </Paper>
    )
}

export default Item;