import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { APIHandler } from '../../conf';
import ItemsList from '../items/items-list';
import ItemListEquipped from '../items/items-list-equipped';
import ItemDetails from '../items/item-details';
import GenderOptions from '../gender-options/gender-options';

const mapStateToProps = state => {
    let title = state.openPanel.title;
    return {
        title: title,
        equippedState: state.equipped,
    }
};

function SubcategoryPanel(props){
    // eslint-disable-next-line
    const [gender, setGender] = useState("All");
    const [equipped, setEquipped] = useState({
        idArray: [],
        equipped: [],
    });
    const [objects, setObjects] = useState(null);
    const useStyles = makeStyles((theme) => ({
        header: {
            padding: 0,
            margin: 5,
        },
        baseContainer: {
            display: 'flex',
            margin: 5,
            flexFlow: 'column'
        },
        baseOptionContainer: {
            margin: 10,
            padding: 5,
            transition: 'all 1 ease',
            '&:hover': {
                cursor: 'pointer',
                '& >img': {
                    padding: 0,
                }
            }
        },
        baseOptionChosen: {
            border: '2px solid grey',
            padding: 0,
        },
        equippedList: {
            width: 'max-content',
            minHeight: 100,
        }
    }));
    const classes = useStyles();

    useEffect(() => {
        if(!objects){
            APIHandler(props.title.toLowerCase())
            .then((data) => setObjects(data))
        }
    }, [objects, props.title]);

    useEffect(() => {
        setEquipped(props.equipped)
    }, [props.equipped, ]);

    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ItemListEquipped equipped={equipped} />
                <GenderOptions setGender={setGender} />
            </div>
            <ItemDetails equipped={equipped || {}}/>
            <Paper>
                <div className={classes.header}>
                    <p>Choose your {props.title.toLowerCase()}</p>
                </div>
                    {
                        objects && Object.entries(objects).length >= 1 ?
                            Object.entries(objects).map((h, index) => // Loop through all subcategories
                                Array.isArray(h[1]) && (h[1].length >= 1) ?
                            
                                    <div key={index} className={classes.baseContainer}>
                                        {h[0] !== 'generic' &&  // Display SubCategory name if supplied
                                            <Typography component={"div"}>{h[0]}</Typography>}
                                        <ItemsList 
                                            items={h[1]}
                                            equipped={equipped}
                                            onClickAction={props.onClickAction}
                                            selectedGender={gender}
                                            />
                                    </div>
                                :
                                null
                            )
                            :
                            `No ${props.title.toLowerCase()} right now`
                    }
            </Paper>
                    {console.log(props.equippedState)}
            <ItemListEquipped equipped={props.equippedState} allEquipped={true} />
        </div>
        )
}

export default connect(mapStateToProps)(SubcategoryPanel);