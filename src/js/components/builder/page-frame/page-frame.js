import React from 'react';
import { 
    Grid,
    makeStyles,
} from '@material-ui/core';
import MenuPanel from '../../menu-panels/menu-panels';
import AppBar from '../../menu/menu-components/app-bar/app-bar';
import { setSidebarOpen } from '../../../redux/actions/index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        sidebarOpen: state.sidebarOpen,
        openPanel: state.openPanel.tab,
        tabTitle: state.openPanel.title
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setSidebarOpen: action => dispatch(setSidebarOpen(action)),
    }
}

function PageFrame(props) {
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        minHeight: '100%',
      },
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2} alignItems={"center"}>
                <AppBar />
                <Grid item xs={12} md={6} style={{ minHeight: 400 }}>
                    {props.children}
                </Grid>
                <Grid item xs={12} md={6} style={{ minHeight: 400 }}>
                    <MenuPanel />
                </Grid>
            </Grid>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PageFrame);