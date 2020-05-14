import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fullURL } from '../../conf';

const useStyles = makeStyles((theme) => ({
    baseOptionContainer: {
        margin: 10,
        padding: 5,
        minWidth: 50,
        minHeight: 50,
        transition: 'all 0.25 ease',
        '&:hover': {
            cursor: 'pointer',
            background: '#f0efed',
            '& >img': {
                // padding: 0,
            }
        },
        '&:active': {
            background: 'initial'
        }
    },
    baseOptionImage: {
        height: 30,
        maxWidth: 70,
    },
    smallOptionImage: {
        maxHeight: 15,
        maxWidth: 50,
        marginTop: '20%',
    },
    baseOptionEquipped: {
        padding: 5,
        minWidth: 50,
        minHeight: 50,
        margin: 10,
        background: 'rgba(0, 0, 0, 0.15)',
        boxShadow: `2px 2px 10px -10px ${theme.palette.primary.main},0px 1px 1px 0px ${theme.palette.primary.main},0px 1px 3px 7px ${theme.palette.secondary.main}`,
        '& >img': {
            padding: 10,
        },
        '&:hover': {
            cursor: 'pointer',
            '& >img': {
                // padding: 'initial',
            }
        },
    },
    equipped: {
        background: 'rgba(0, 0, 0, 0.15)',
        boxShadow: `2px 2px 1px -1px ${theme.palette.secondary.main},0px 1px 1px 0px ${theme.palette.secondary.main},0px 1px 3px 2px ${theme.palette.primary.main}`,
        
    }
}))

function Item(props) {
    const [itemLoading, setItemLoading] = useState(true);
    const [equipped, setEquipped] = useState(false);
    const [useClassName, setUseClassName] = useState(null);
    const [image, setImage] = useState("");
    const classes = useStyles();

    useEffect(() => {
        if(props.equipped){
            setEquipped(props.equipped)
        }
    }, [props.equipped, ]);

    useEffect(() => {
        setImage(props.item.image.thumbnail || props.item.image.image)
    }, [props.item,]);

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
        }
        if(image){
            getClassName(image)
            setTimeout(function(){
                setItemLoading(!itemLoading)
            }, 100)
        }
    }, [image, ])

    return (
        <Paper
            className={`${equipped ? classes.baseOptionEquipped : classes.baseOptionContainer} ${props.isEquippedList ? classes.equipped : null}`} 
            onClick={(event) => props.onClickAction(props.item)}
            key={props.item.id}
        >
            {!itemLoading &&
                <img src={fullURL(image)} alt={props.item.alt} className={useClassName} />
            }
        </Paper>
    )
}

export default Item;