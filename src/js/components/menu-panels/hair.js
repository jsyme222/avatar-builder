import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setHair } from '../../redux/actions/index';

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
        if(!hair) {
            let hairData = require('./test-data/hair-data.json');
            setHair(hairData)
        }
    }, [hair, ]);

    const handleClick = (pk, image, title, front, back=null) => {
        props.setHair(
            {
                pk: pk,
                title: title,
                image: image,
                layer: [
                    {
                        layer: 50,
                        image: front.image
                    },
                    {
                        layer: 0,
                        image: back.image
                    }
                ]
            }
        )
    };

    return (
        <Paper>
            <Typography component={"div"}>Hair</Typography>
            <div className={classes.header}>
                <p>Choose your hair</p>
            </div>
            <Paper className={classes.baseContainer}>
                {
                    hair && 
                        hair.map((option, index) => 
                            (option.gender === props.gender || option.gender === "Unisex") ?
                                    <Paper 
                                        className={(option.pk === props.hair.pk) ? classes.baseOptionChosen : classes.baseOptionContainer } 
                                        onClick={() => handleClick(option.pk, option.image, option.title, option.layer[0], (option.layer[1] && option.layer[1]))}
                                        key={index}
                                        >
                                        <img src={option.thumbnail} alt={option.alt} className={classes.baseOptionImage} />
                                    </Paper>
                                    : null
                        )
                }
            </Paper>
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(HairTab);