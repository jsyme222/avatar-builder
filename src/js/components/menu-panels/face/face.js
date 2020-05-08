import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { 
    setFace,
    setEyebrows,
    setEyes,
    setMouth,
    setNose,
} from '../../../redux/actions/index';
import ItemsList from '../../items/items-list';
import { APIHandler } from '../../../conf';

const mapStateToProps = state => {
    return {
        gender: state.avatar.gender,
        face: state.layers.face,
        eyebrows: state.layers.face.eyebrows,
        eyes: state.layers.face.eyes,
        nose: state.layers.face.nose,
        mouth: state.layers.face.mouth,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setFace: face => dispatch(setFace(face)),
        setEyebrows: eyebrows => dispatch(setEyebrows(eyebrows)),
        setEyes: eyes => dispatch(setEyes(eyes)),
        setMouth: mouth => dispatch(setMouth(mouth)),
        setNose: nose => dispatch(setNose(nose)),
    }
};

function FaceTab(props) {
    const useStyles = makeStyles((theme) => ({
        header: {
            padding: 0,
            margin: 5,
        },
        baseContainer: {
            display: 'flex',
            margin: 5
        },
        itemContainer: {
            display: 'flex',
        },
        baseOptionChosen: {
            border: '2px solid grey',
            padding: 0,
        },
    }));
    const classes = useStyles();
    const [faceCategories, setFaceCategories] = useState(null);
    const SUBCATEGORIES = {
        'EYEBROWS': props.setEyebrows,
        'EYES': props.setEyes,
        'NOSES': props.setNose,
        'MOUTHS': props.setMouth
    };

    const handleClick = (obj) => {
        let field = obj.subcategory;
        SUBCATEGORIES[field](obj);
    };

    useEffect(() => {
        if(!faceCategories){
            APIHandler('faces')
            .then((faces) => {
                setFaceCategories(faces);
            })
        }
    }, [faceCategories, ]);

    return (
        <Paper>
            <Typography component={"div"}>Face</Typography>
            <div className={classes.header}>
                <p>Choose your Face</p>
            </div>
                {
                    faceCategories && Object.entries(faceCategories).length >= 1 ?
                        Object.entries(faceCategories).map((option, index) => // Loop through all face categories
                                    Array.isArray(option[1]) && option[1].length >= 1 ?
                                    
                                            <Paper key={index} className={classes.baseContainer}>
                                                <Typography component={"div"}>{option[0]}</Typography>
                                                <ItemsList 
                                                    items={option[1]}
                                                    onClickAction={handleClick}
                                                    />
                                            </Paper>
                                        :
                                        null

                        )
                        :
                        "No faces right now"
                }
            </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceTab);