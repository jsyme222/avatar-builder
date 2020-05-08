import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
} from '@material-ui/core';
import ItemsList from '../items/items-list';
import { connect } from 'react-redux';
import { setHair } from '../../redux/actions/index';
import { APIHandler } from '../../conf';

const mapStateToProps = state => {
    return {
        hair: state.layers.hair,
        gender: state.avatar.gender,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setHair: hair => dispatch(setHair(hair)),
    }
};

function HairTab(props) {
    const [hair, setHair] = useState(null);
    const useStyles = makeStyles((theme) => ({
        header: {
            padding: 0,
            margin: 5,
        },
        baseContainer: {
            display: 'flex',
            margin: 5
        },
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
        baseOptionChosen: {
            border: '2px solid grey',
            padding: 0,
        },
        baseOptionImage: {
            // width: 150,
        }
    }));
    const classes = useStyles();

    useEffect(() => {
        if(!hair) {
            APIHandler('hair')
            .then((data) => {
                setHair(data)
            })
        }
    }, [hair, ]);

    const handleClick = (hair) => {
        props.setHair([hair, ])
    };

    return (
        <Paper>
            <Typography component={"div"}>Hair</Typography>
            <div className={classes.header}>
                <p>Choose your hair</p>
            </div>
                {
                    hair && Object.entries(hair).length >= 1 ?
                        Object.entries(hair).map((h, index) => // Loop through all hair categories
                        Array.isArray(h[1]) && h[1].length >= 1 ?
                        
                                <Paper key={index} className={classes.baseContainer}>
                                    <Typography component={"div"}>{h[0]}</Typography>
                                    <ItemsList 
                                        items={h[1]}
                                        onClickAction={handleClick}
                                        />
                                </Paper>
                            :
                            null
                        )
                        :
                        "No hair right now"
                }
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(HairTab);