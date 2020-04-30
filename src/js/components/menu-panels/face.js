import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
    Switch
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setAvatar, setBase, setGender } from '../../redux/actions/index';

const mapStateToProps = state => {
    return {
        base: state.layers.base.title,
        username: state.avatar.username,
        gender: state.avatar.gender,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setAvatar: avatar => dispatch(setAvatar(avatar)),
        setBase: base => dispatch(setBase(base)),
        setGender: gender => dispatch(setGender(gender)),
    }
};

function FaceTab(props) {
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
            height: 100,
        }
    }));
    const classes = useStyles();
    const [baseOptions, setBaseOptions] = useState(null);
    const [gender, setGender] = useState(null);

    const handleClick = (image, title, newGender) => {
        props.setBase(
            {
                title: title,
                image: image,
                gender: newGender
            }
        )
        props.setGender(newGender);
    };

    useEffect(() => {
        if(!baseOptions){
            let options = require('./test-data/base-data.json');
            setBaseOptions(options);
        }
    }, [baseOptions, ]);

    useEffect(() => {
        if(!gender) {
            setGender(props.gender)
        }
    }, [gender, props]);

    return (
        <Paper>
            <Typography component={"div"}>Face</Typography>
            <div className={classes.header}>
                <p>Choose your Face</p>
            </div>
            <Paper className={classes.baseContainer}>
                {
                    baseOptions && 
                        baseOptions.map((option, index) => 
                            (option.gender === gender) ?
                                    <Paper 
                                        className={(props.base === option.title) ? classes.baseOptionChosen : classes.baseOptionContainer } 
                                        onClick={() => handleClick(option.image, option.title, option.gender)}
                                        key={index}
                                        >
                                        
                                        <p>{option.title}</p>
                                        <img src={option.image} alt={option.alt} className={classes.baseOptionImage} />
                                    </Paper>
                                    : null
                        )
                }
            </Paper>
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceTab);