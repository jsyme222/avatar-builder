import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { fullURL } from '../../conf';
import { connect } from 'react-redux';
import { setDetails } from '../../redux/actions';

const mapStateToProps = state => {
    return {
        details: state.itemDetails,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDetails: details => dispatch(setDetails(details)),
    }
};

const useStyles = makeStyles((theme) => ({
    baseOptionContainer: {
        margin: 3.5,
        padding: 2.5,
        minWidth: 30,
        minHeight: 30,
        transition: 'all 0.25 ease',
        '&:hover': {
            cursor: 'pointer',
            background: '#f0efed',
        },
        '&:active': {
            background: 'initial'
        }
    },
    baseOptionImage: {
        marginTop: '20%',
        height: 30,
        maxWidth: 70,
    },
    smallOptionImage: {
        marginTop: '40%',
        maxHeight: 25,
        width: 'auto',
    },
    baseOptionContainerEquipped: {
        padding: 5,
        minWidth: 30,
        minHeight: 30,
        marginTop: 0,
        margin: 10,
        background: 'rgba(0, 0, 0, 0.15)',
        boxShadow: `2px 2px 10px -10px ${theme.palette.primary.main},0px 1px 1px 0px ${theme.palette.primary.main},0px 1px 3px 7px ${theme.palette.secondary.main}`,
        '&:hover': {
            cursor: 'pointer',
        },
    },
    equipped: {
        minWidth: 35,
        minHeight: 35,
        padding: 1.2,
        margin: 2,
        background: 'rgba(0, 0, 0, 0.15)',
        boxShadow: `2px 2px 1px -1px ${theme.palette.secondary.main},0px 1px 1px 0px ${theme.palette.secondary.main},0px 1px 3px 2px ${theme.palette.secondary.main}`,
        '& >img': {
            marginTop: '20%',
            padding: 1.2,
            width: 'auto',
        }
    },
    beingViewed: {
        '& >div': {
            borderLeft: `2px solid ${theme.palette.primary.main}`,
        }
    }
}))

function Item(props) {
    // eslint-disable-next-line
    const [itemLoading, setItemLoading] = useState(false);
    const [isBeingViewed, setIsBeingViewed] = useState(false);
    const [isEquippedList, setIsEquippedList] = useState(false);
    const [equipped, setEquipped] = useState(false);
    const [image, setImage] = useState("");
    const [smallImage, setSmallImage] = useState("");
    const classes = useStyles();

    const isSmallImage = (src) => {
        let i = new Image();
        i.src = src;     
        let w = i.width;
        let h = i.height;
        let small = Math.max(w, h) < 50;
        return small;
    };

    const ListItem = () => {
        return (
            <Paper
                className={`${equipped ? classes.baseOptionContainerEquipped : classes.baseOptionContainer} ${props.isEquippedList ? classes.equipped : null}`} 
                onClick={(event) => props.onClickAction(props.item)}
                key={props.item.id}
            >
            {!itemLoading ?
                !smallImage ?
                        <img src={fullURL(image)} alt={props.item.alt} className={classes.baseOptionImage}/>
                        :
                        <img src={fullURL(image)} alt={props.item.alt} className={classes.smallOptionImage}/>
                :
                <Skeleton variant={"circle"} width={30} height={30} style={{ margin: 'auto' }}/>
            }
            </Paper>
        )
    };

    const EquippedItem = () => {
        return (
            <Paper
                className={`${equipped ? classes.baseOptionContainerEquipped : classes.baseOptionContainer} ${classes.equipped}`} 
                onClick={(event) => props.setDetails(props.item)}
                key={props.item.id}
            >
            {!itemLoading ?
                !smallImage ?
                        <img src={fullURL(image)} alt={props.item.alt} className={classes.baseOptionImage}/>
                        :
                        <img src={fullURL(image)} alt={props.item.alt} className={classes.smallOptionImage}/>
                :
                <Skeleton variant={"circle"} width={30} height={30} style={{ margin: 'auto' }}/>
            }
            </Paper>
        )
    };

    useEffect(() => {
        if(props.equipped){
            setEquipped(props.equipped)
        }
    }, [props.equipped, ]);

    useEffect(() => {
        let i = props.item.image.thumbnail || props.item.image.image;
        setImage(i);
        setSmallImage(isSmallImage(i));
    }, [props.item,]);

    useEffect(() => {
        if(props.isEquippedList){
            setIsEquippedList(props.isEquippedList)
        }
    }, [props.isEquippedList, ]);

    useEffect(() => {
        if(props.details.id) {
            if(props.item.id === props.details.id){
                setIsBeingViewed(true);
            }else{
                setIsBeingViewed(false);
            }
        }
    }, [props.details.id, props.item.id, ])

    return (
        <div className={isBeingViewed ? classes.beingViewed : null}>
            {!isEquippedList ?
                <ListItem />
                :
                <EquippedItem />}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);