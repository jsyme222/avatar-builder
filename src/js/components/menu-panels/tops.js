import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setTop } from '../../redux/actions/index';

const mapStateToProps = state => {
    return {
        top: state.layers.top,
        gender: state.avatar.gender,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setTop: top => dispatch(setTop(top)),
    }
};

function TopsTab(props) {
    const [tops, setTops] = useState(null);
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
            }
        },
        baseOptionChosen: {
            margin: 10,
            padding: 5,
            transition: 'all 1 ease',
            border: '2px solid grey',
        },
    }));
    const classes = useStyles();

    useEffect(() => {
        if(!tops) {
            let topsData = require('./test-data/tops-data.json');
            setTops(topsData)
        }
    }, [tops, ]);

    const handleClick = (image, title, pk) => {
        props.setTop(
            {
                title: title,
                image: image,
                pk: pk,
            }
        )
    };

    return (
        <Paper>
            <Typography component={"div"}>Tops</Typography>
            <div className={classes.header}>
                <p>Choose your Top</p>
            </div>
            <Paper className={classes.baseContainer}>
                {
                    tops && 
                        tops.map((top, index) => 
                            (top.gender === props.gender) ?
                                    <Paper 
                                        className={(top.pk === props.top.pk) ? classes.baseOptionChosen : classes.baseOptionContainer } 
                                        onClick={() => handleClick(top.image, top.title, top.pk)}
                                        key={index}
                                        >
                                        <img src={top.thumbnail} alt={top.alt} className={classes.baseOptionImage} />
                                    </Paper>
                                    : null
                        )
                }
            </Paper>
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TopsTab);