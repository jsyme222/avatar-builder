import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
    Grid,
    Button
} from '@material-ui/core';
import ItemsList from '../../items/items-list';
import { connect } from 'react-redux';
import { setBase, setGender, setDetails, setLayers } from '../../../redux/actions/index';
import { APIHandler } from '../../../conf';
import SetEquipped from '../../../custom-hooks/set-equipped';
import GenderOptions from '../../gender-options/gender-options';
import ItemDetails from '../../items/item-details';

const mapStateToProps = state => {
    return {
        base: state.layers.base,
        gender: state.avatar.gender,
        details: state.itemDetails,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setBase: base => dispatch(setBase(base)),
        setGender: gender => dispatch(setGender(gender)),
        setDetails: details => dispatch(setDetails(details)),
        setLayers: layers => dispatch(setLayers(layers)),
    }
};

function BaseTab(props) {
    const [baseOptions, setBaseOptions] = useState(null);
    const [gender, setGender] = useState("All");
    const equipped = SetEquipped(props.base);
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

    const handleClick = (base) => {
        props.setDetails(base)
        props.setBase([base, ]); // base must be set inside an array
        props.setGender(base.gender);
    };

    const handleStrip = (event) => {
        props.setLayers([])
    }

    useEffect(() => {
        if(!baseOptions){
            APIHandler('baseImages')
            .then((bases) => setBaseOptions(bases.results));
        }
    }, [baseOptions, ]);

    return (
        <Paper>
            <Typography component={"div"}>Base</Typography>
            <ItemDetails />
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
                            equipped={equipped}
                            />
                }
            </Paper>
            <GenderOptions setGender={setGender}/>
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