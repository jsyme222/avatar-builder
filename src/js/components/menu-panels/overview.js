import React, { useState } from 'react';
import {
    Paper,
    makeStyles,
    Grid,
    Typography
} from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        username: state.avatar.username,
        gender: state.avatar.gender,
        outfitName: state.avatar.outfitName,
    }
}

function OverviewTab(props) {
    const [equipped, setEquipped] = useState(null);
    const useStyles = makeStyles((theme) => ({
        root: {

        },
        username: {
            padding: 0,
            margin: 5,
            textAlign: 'left',
        },
        headerBox: {
            marginTop: 10,
            padding: 5,
        },
        equipmentBox: {
            margin: 5,
            padding: 5,
        }
    }));
    const classes = useStyles();

    return (
        <Paper>
            <Typography component={"div"}>Overview</Typography>
            <p className={classes.username}>@{props.username}</p>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.headerBox}>
                        <p>Gender</p>
                        <h4>{props.gender}</h4>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.headerBox}>
                        <p>Outfit</p>
                        <h4>{props.outfitName}</h4>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography component={"div"}>Equipped</Typography>
                    <Paper className={classes.equipmentBox}>
                        {
                            equipped ?
                                equipped.map((item) => 
                                <h1>{item}</h1>
                                )
                                :
                                <p>Nothing equipped</p>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default connect(mapStateToProps)(OverviewTab);