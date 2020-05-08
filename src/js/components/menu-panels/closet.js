import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Typography
} from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        username: state.avatar.username,
    }
}

function ClosetTab(props) {
    const useStyles = makeStyles((theme) => ({
        root: {

        },
        header: {
            padding: 0,
            margin: 5,
        },
        outfitContainer: {
            margin: 5
        }
    }));
    const classes = useStyles();
    const [outfits, setOutfits] = useState(null);

    useEffect(() => {
        if(!outfits){
            setOutfits(require('./test-data/closet-data.json'))
        }
    }, [outfits, ]);

    return (
        <Paper>
            <Typography component={"div"}>Closet</Typography>
            <div className={classes.header}>
                <p>Here are all the outfits you have saved over time</p>
            </div>
            <Paper className={classes.outfitContainer}>
                {
                    outfits && 
                        outfits.map((outfit) => 
                            <div>
                                <p>{outfit.title}</p>
                            </div>
                        )
                }
            </Paper>
        </Paper>
    )
}

export default connect(mapStateToProps)(ClosetTab);