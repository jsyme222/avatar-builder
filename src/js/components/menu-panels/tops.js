import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { setTops } from '../../redux/actions/index';
import { APIHandler } from '../../conf';
import ItemsList from '../items/items-list';

const mapStateToProps = state => {
    return {
        top: state.layers.top,
        gender: state.avatar.gender,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setTops: tops => dispatch(setTops(tops)),
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
            APIHandler('tops')
            .then((data) => setTops(data.results))
        }
    }, [tops, ]);

    const handleClick = (tops) => {
        props.setTops([tops, ])
    };

    return (
        <Paper>
            {console.log(tops)}
            <Typography component={"div"}>Tops</Typography>
            <div className={classes.header}>
                <p>Choose your Top</p>
            </div>
            <Paper className={classes.baseContainer}>
                {
                    Array.isArray(tops) && 
                        <ItemsList 
                            items={tops} 
                            onClickAction={handleClick}
                        />
                }
            </Paper>
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TopsTab);