import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
    Switch,
    Grid,
    Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setAvatar, setBase, setGender } from '../../redux/actions/index';
import { APIHandler } from '../../conf';

const mapStateToProps = state => {
    return {
        base: state.layers.base,
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

function BaseTab(props) {
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
        },
        buttonInfo: {
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'space-between',
            margin: 15,
        }
    }));
    const classes = useStyles();
    const [baseOptions, setBaseOptions] = useState(null);
    const [gender, setGender] = useState(null);

    const handleClick = (image, title, newGender, pk) => {
        props.setBase(
            {
                title: title,
                image: image,
                gender: newGender,
                pk: pk
            }
        )
        props.setGender(newGender);
    };
    const handleChange = (event) => {
        let newGender = (gender === 'MALE') ? 'FEMALE' : 'MALE';
        setGender(newGender);
    }

    useEffect(() => {
        if(!baseOptions){
            APIHandler('baseImages')
            .then((bases) => setBaseOptions(bases.results));
            // let options = require('./test-data/base-data.json');
            // setBaseOptions(options);
        }
    }, [baseOptions, ]);

    useEffect(() => {
        if(!gender) {
            setGender(props.gender)
        }
    }, [gender, props]);

    return (
        <Paper>
            <Typography component={"div"}>Base</Typography>
            <div className={classes.header}>
                <p>Choose your Base</p>
            </div>
            <Paper className={classes.baseContainer}>
                {
                    Array.isArray(baseOptions) && 
                        baseOptions.map((option) => 
                            (option.gender === gender || option.gender === "UNISEX") ?
                                    <Paper 
                                        className={(props.base.pk === option.pk) ? classes.baseOptionChosen : classes.baseOptionContainer } 
                                        onClick={() => handleClick(option.image, option.title, option.gender, option.pk)}
                                        key={option.pk}
                                        >
                                        <img src={option.image.image} alt={option.alt} className={classes.baseOptionImage} />
                                    </Paper>
                                    : null
                        )
                }
            </Paper>
            <div>
                <p>Gender</p>
                Female
                <Switch
                    checked={gender === "MALE"}
                    onChange={handleChange}
                />
                Male
            </div>
                <Grid container>
                    <Grid item xs={12} className={classes.buttonInfo}>
                        <Button variant={"outlined"}>Reset</Button>
                        <p>Reset your avatar to the default equipment and settings</p>
                    </Grid>
                    <Grid item xs={12} className={classes.buttonInfo}>
                        <Button variant={"outlined"}>Strip</Button>
                        <p>Who needs clothes anyway!</p>
                    </Grid>
                </Grid>
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseTab);