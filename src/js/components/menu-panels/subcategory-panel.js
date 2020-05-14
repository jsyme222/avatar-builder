import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { APIHandler } from '../../conf';
import ItemsList from '../items/items-list';
import GenderOptions from '../gender-options/gender-options';

const mapStateToProps = state => {
    let title = state.openPanel.title;
    return {
        title: title,
        gender: state.avatar.gender
    }
};

function SubcategoryPanel(props){
    // eslint-disable-next-line
    const [gender, setGender] = useState("Male");
    const [objects, setObjects] = useState(null);
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
    }));
    const classes = useStyles();

    useEffect(() => {
        if(!objects){
            APIHandler(props.title.toLowerCase())
            .then((data) => setObjects(data))
        }
    }, [objects, props.title]);

    useEffect(() => {
        setGender(props.gender)
    }, [props.gender, ]);

    return (
        <> 
            <GenderOptions setGender={setGender} />
            <Paper>
                <Typography component={"div"}>{props.title}</Typography>
                <div className={classes.header}>
                    <p>Choose your {props.title.toLowerCase()}</p>
                </div>
                    {
                        objects && Object.entries(objects).length >= 1 ?
                            Object.entries(objects).map((h, index) => // Loop through all subcategories
                                Array.isArray(h[1]) && h[1].length >= 1 ?
                            
                                    <Paper key={index} className={classes.baseContainer}>
                                        {h[0] !== 'generic' && 
                                            <Typography component={"div"}>{h[0]}</Typography>}
                                        <ItemsList 
                                            items={h[1]}
                                            equipped={props.equipped}
                                            onClickAction={props.onClickAction}
                                            />
                                    </Paper>
                                :
                                null
                            )
                            :
                            `No ${props.title.toLowerCase()} right now`
                    }
            </Paper>
        </>
        )
}

export default connect(mapStateToProps)(SubcategoryPanel);