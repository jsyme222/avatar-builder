import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
    FormControl,
    MenuItem,
    Select,
    Input,
    Grid,
    Button
} from '@material-ui/core';
import ItemsList from '../items/items-list';
import { connect } from 'react-redux';
import { setBase, setGender, setLayers } from '../../redux/actions/index';
import { APIHandler } from '../../conf';

const mapStateToProps = state => {
    return {
        base: state.layers.base,
        gender: state.avatar.gender,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setBase: base => dispatch(setBase(base)),
        setGender: gender => dispatch(setGender(gender)),
        setLayers: layers => dispatch(setLayers(layers)),
    }
};

function BaseTab(props) {
    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
          maxWidth: 300,
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
    const [genderSelections, setGenderSelections] = useState([]);
    const [gender, setGender] = useState("Male");

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    const handleClick = (base) => {
        props.setBase([base, ]); // base must be set inside an array
        props.setGender(base.gender);  // gender is serialized as gender: { "title": "Male" }
    };

    const handleStrip = (event) => {
        props.setLayers([])
    }

    const handleChange = (event) => {
        let newGender = event.target.value;
        setGender(newGender);
    }

    useEffect(() => {
        if(!baseOptions){
            APIHandler('baseImages')
            .then((bases) => setBaseOptions(bases.results));
        }
    }, [baseOptions, ]);

    useEffect(() => {
        setGender(props.gender)
    }, [props.gender, ]);

    useEffect(() => {
        if(!genderSelections.length) {
            APIHandler('genders')
            .then((genders) => setGenderSelections(genders.results));
        }
    }, [genderSelections, ]);

    return (
        <Paper>
            <Typography component={"div"}>Base</Typography>
            <div className={classes.header}>
                <p>Choose your Base</p>
            </div>
            <Paper className={classes.baseContainer}>
                {
                    Array.isArray(baseOptions) && 
                        <ItemsList 
                            items={baseOptions}
                            onClickAction={handleClick}
                            selectedGender={gender}
                            />
                }
            </Paper>
            <div>
                <FormControl className={classes.formControl}>
                        <Select
                        labelId="gender-select"
                        id="gender-select"
                        value={gender || ""}
                        onChange={handleChange}
                        input={<Input />}
                        MenuProps={MenuProps}
                        >
                        {(genderSelections.length >= 1) && genderSelections.map((gender) => (
                            <MenuItem key={gender.id + gender.title} value={gender.title}>
                            {gender.title}
                            </MenuItem>
                        ))}
                        </Select>
                </FormControl>
            </div>
                <Grid container>
                    <Grid item xs={12} className={classes.buttonInfo}>
                        <Button variant={"outlined"}>Reset</Button>
                        <p>Reset your avatar to the default equipment and settings</p>
                    </Grid>
                    <Grid item xs={12} className={classes.buttonInfo}>
                        <Button variant={"outlined"} onClick={handleStrip}>Strip</Button>
                        <p>Who needs clothes anyway!</p>
                    </Grid>
                </Grid>
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseTab);