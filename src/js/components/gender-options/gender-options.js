import React, { useState } from 'react';
import {
    makeStyles,
    FormControl,
    Select,
    MenuItem,
    Input,
    InputLabel,
} from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        genderSelections: state.genderSelections,
        tab: state.openPanel.id
    }
}

function GenderOptions(props){
    const [gender, setGender] = useState("All");
    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
          maxWidth: 300,
        },
    }));
    const classes = useStyles();

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

    const handleChange = (event) => {
        let newGender = event.target.value;
        setGender(newGender);
        props.setGender(newGender);
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                    <InputLabel id="gender-select-label">Gender</InputLabel>
                    <Select
                        labelId="gender-select"
                        id="gender-select"
                        value={gender}
                        label={"Gender"}
                        onChange={handleChange}
                        input={<Input />}
                        MenuProps={MenuProps}
                    >
                        <MenuItem key={"unisex-items"} value={"All"}>
                            All
                        </MenuItem>
                    {(props.genderSelections.length >= 1) && 
                        props.genderSelections.map((gender) => (
                            <MenuItem key={gender.id + gender.title} value={gender.title}>
                                {gender.title}
                            </MenuItem>
                    ))}
                    </Select>
            </FormControl>
        </div>
    )
}

export default connect(mapStateToProps)(GenderOptions);