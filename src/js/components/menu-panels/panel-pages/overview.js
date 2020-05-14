import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Grid,
    Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import ItemsList from '../../items/items-list';

const mapStateToProps = state => {
    return {
        username: state.avatar.username,
        gender: state.avatar.gender,
        outfitName: state.avatar.outfitName,
        layers : state.layers,
    }
}

function OverviewTab(props) {
    // eslint-disable-next-line
    const [equipped, setEquipped] = useState([]);
    const useStyles = makeStyles((theme) => ({
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

    useEffect(() => {
        setEquipped(props.layers);
    }, [props.layers, ])

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
                        <h4>{props.outfitName || "Name your outfit!"}</h4>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography component={"div"}>Equipped</Typography>
                    <Paper className={classes.equipmentBox}>
                        <ItemsList
                            items={equipped || []}
                            equipped={equipped || []}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default connect(mapStateToProps)(OverviewTab);