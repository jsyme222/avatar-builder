import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
    Container,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { 
    setFace,
    setEyebrows,
    setEyes,
    setNose,
    setMouth,
} from '../../../redux/actions/index';
import { APIHandler } from '../../../conf';

const mapStateToProps = state => {
    return {
        gender: state.avatar.gender,
        face: state.layers.face
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setFace: face => dispatch(setFace(face)),
        setEyebrows: eyebrows => dispatch(setEyebrows(eyebrows)),
        setEyes: eyes => dispatch(setEyes(eyes)),
        setMouth: mouth => dispatch(setMouth(mouth)),
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
        itemContainer: {
            display: 'flex',
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
    const [faceCategories, setFaceCategories] = useState(null);
    const SUBCATEGORIES = {
        'Eyebrows': props.setEyebrows,
        'Eyes': props.setEyes,
        'Noses': props.setNose,
        'Mouths': props.setMouth
    };

    const handleClick = (field, item_number, image, title) => {
        let newObj = {
            pk: item_number,
            image: image,
            title: title,
        }
        console.log(newObj);
        SUBCATEGORIES[field](newObj);
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
                                    
                                            <Container key={index} className={classes.baseContainer}>
                                                <Typography component={"div"}>{option[0]}</Typography>
                                                <div className={classes.itemContainer}>
                                                    {
                                                            option[1].map((item) => // Loop through items of category

                                                                    <Paper
                                                                        className={classes.baseOptionContainer} 
                                                                        onClick={() => handleClick(option[0], item.item_number, item.image, item.title)}
                                                                        key={item.pk}
                                                                    >
                                                                        {console.log()}
                                                                        <img src={item.image.thumbnail} alt={item.alt} className={classes.baseOptionImage} />
                                                                    </Paper>

                                                            )
                                                    }
                                                </div>
                                            </Container>
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