import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setAccessories } from '../../redux/actions/index';
import { APIHandler } from '../../conf';

const mapStateToProps = state => {
    return {
        accessories: state.layers.accessories,
        gender: state.avatar.gender,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setAccessories: ace => dispatch(setAccessories(ace)),
    }
};

function AccessoriesTab(props) {
    const [accessories, setAccessories] = useState(null);
    const [equipped, setEquipped] = useState(null);
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
        if(!accessories) {
            APIHandler('accessories')
            .then((aces) => setAccessories(aces.results));
        }
    }, [accessories, ]);

    useEffect(() => {
        if(props.accessories.length >= 1){
                let e = []
                props.accessories.map((ace) => 
                    e.push(ace.pk)
                )
                setEquipped(e);
        }else {
            setEquipped([])
        }
    }, [props.accessories]);

    const handleClick = (pk, image, title, ) => {
        props.setAccessories(
            {
                pk: pk,
                title: title,
                image: image,
                layer: 1
            }
        )
    };

    return (
        <Paper>
            <Typography component={"div"}>Accessories</Typography>
            <div className={classes.header}>
                <p>Choose your accessories</p>
            </div>
            <Paper className={classes.baseContainer}>
                {
                    Array.isArray(accessories) && 
                        accessories.map((option, index) => 
                            (option.gender === props.gender || option.gender === "UNISEX") ?
                                    <Paper 
                                        className={(equipped.includes(option.pk)) ? classes.baseOptionChosen : classes.baseOptionContainer } 
                                        onClick={() => handleClick(option.pk, option.image, option.title)}
                                        key={index}
                                        >
                                        <img src={option.image.thumbnail} alt={option.alt} className={classes.baseOptionImage} />
                                    </Paper>
                                    : null
                        )
                }
            </Paper>
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessoriesTab);