import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setBottom } from '../../redux/actions/index';
import { APIHandler } from '../../conf';

const mapStateToProps = state => {
    return {
        bottom: state.layers.bottom,
        gender: state.avatar.gender,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setBottom: bottom => dispatch(setBottom(bottom)),
    }
};

function BottomsTab(props) {
    const [bottoms, setBottoms] = useState(null);
    const [equipped, setEquipped] = useState(null);
    const useStyles = makeStyles((theme) => ({
        root: {

        },
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
        if(!bottoms) {
            APIHandler('bottoms')
            .then((bottoms) => setBottoms(bottoms.results));
        }
    }, [bottoms, ]);

    const handleClick = (pk, image, title, ) => {
        props.setBottom(
            {
                pk: pk,
                title: title,
                image: image,
                layer: 1
            }
        )
    };

    return (
        <Paper>
            <Typography component={"div"}>Bottoms</Typography>
            <div className={classes.header}>
                <p>Choose your Bottoms</p>
            </div>
            <Paper className={classes.baseContainer}>
                {
                    Array.isArray(bottoms) && 
                        bottoms.map((option, index) => 
                            (option.gender === props.gender || option.gender === "UNISEX") ?
                                    <Paper 
                                        className={(option.pk === props.bottom.pk) ? classes.baseOptionChosen : classes.baseOptionContainer } 
                                        onClick={() => handleClick(option.pk, option.image, option.title)}
                                        key={index}
                                        >
                                        <img src={option.image.thumbnail} alt={option.alt} className={classes.baseOptionImage} />
                                    </Paper>
                                    : null
                        )
                }
            </Paper>
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomsTab);