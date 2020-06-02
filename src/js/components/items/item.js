import React, { useState, useEffect } from 'react';
import { Paper, Grow } from '@material-ui/core';
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
    optionContainer: {
        margin: 3.5,
        padding: 2.5,
        minWidth: 30,
        minHeight: 30,
        transition: 'all 0.25s ease',
        boxShadow: `inset 1px 2px 1px 1px rgba(23, 23, 23, 0.5),0px 1px 1px 0px rgba(23,23,23,0.5)`,
        '&:hover': {
            cursor: 'pointer',
            background: '#f0efed',
        },
        '&:active': {
            background: 'initial'
        }
    },
    optionImage: {
        marginTop: '20%',
        maxHeight: 30,
        width: 'auto',
    },
    optionContainerEquipped: {
        transition: 'all 0.25s ease',
        boxShadow: `2px 2px 10px -5px ${theme.palette.primary.main},0px 1px 1px 0px ${theme.palette.secondary.main},0px 1px 3px 5px ${theme.palette.secondary.main}`,
    },
    equippedListItem: {
        minWidth: 30,
        minHeight: 30,
        padding: 1.2,
        margin: 2,
        transition: 'all 0.25s ease',
        '& >img': {
            marginTop: '20%',
            padding: 1.2,
            width: 'auto',
        },
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.15)',
        }
    },
    beingViewed: {
        '& >div': {
            boxShadow: `2px 2px 1px -15px ${theme.palette.secondary.main},0px 1px 1px 0px ${theme.palette.secondary.main},0px 1px 3px 5px ${theme.palette.primary.main}`,
        },
    }
}))

function Item(props) {
    // eslint-disable-next-line
    const [itemLoading, setItemLoading] = useState(true);
    const [item, setItem] = useState(null);
    // eslint-disable-next-line
    const [isBeingViewed, setIsBeingViewed] = useState(false);
    const [equipped, setEquipped] = useState(false);
    const [image, setImage] = useState("");
    const classes = useStyles();

    const ListItem = () => {
        return (
                <Paper
                    className={`${classes.optionContainer}  ${equipped && classes.optionContainerEquipped} ${props.isEquippedList && classes.equippedListItem }`} 
                    onClick={props.onClickAction && (event => props.onClickAction(props.item))}
                    key={props.item.id}
                >
                {(!itemLoading && image) ?
                    <img src={fullURL(image)} alt={props.item.alt} className={classes.optionImage}/>
                    :
                    <Skeleton variant={"circle"} width={30} height={30} style={{ margin: 'auto' }}/>
                }
                </Paper>
        )
    };

    useEffect(() => {
        setItem(props.item)
    }, [props.item, ]);

    useEffect(() => {
        if(props.equipped){
            setEquipped(props.equipped)
            setTimeout(() => {
                setItemLoading(false);
            }, 200)
        }
    }, [props.equipped, ]);

    useEffect(() => {
        let i = props.item.image.thumbnail || props.item.image.image;
        setImage(i);
        setItemLoading(false)
    }, [props.item, ]);

    useEffect(() => {
        if(props.details.id && item) {
            if(item.id === props.details.id){
                setIsBeingViewed(true);
            }else{
                setIsBeingViewed(false);
            }
        }
    }, [props.details, item ])

    return (
        <div>
            <Grow in={!itemLoading} >
                <ListItem />
            </Grow>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);