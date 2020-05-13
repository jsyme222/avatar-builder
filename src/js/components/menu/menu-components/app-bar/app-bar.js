import React from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar,
    IconButton,
    Fab,
} from '@material-ui/core';
import {
    Camera,
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { setSidebarOpen } from '../../../../redux/actions/index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        sidebarOpen: state.sidebarOpen,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setSidebarOpen: action => dispatch(setSidebarOpen(action)),
    }
};

function BuilderAppBar(props) {
    const useStyles = makeStyles((theme) => ({
        appBar: {
            bottom: 'auto',
            top: 0,
            '@media(max-width: 960px)': {
                marginBottom: 20,
          }
        },
        snapshot: {
            position: 'absolute',
            zIndex: 1,
            top: 30,
            left: 0,
            right: 0,
            margin: '0 auto',
          },
    }));
    
    const classes = useStyles();

    return (
            <AppBar position="static" color={"secondary"} className={classes.appBar}>
                <Toolbar>
                    <IconButton 
                        edge={"start"} 
                        color={"primary"} 
                        aria-label={"open builder menu"} 
                        onClick={(event) => props.setSidebarOpen(!props.sidebarOpen)}
                    >
                        <MenuIcon className={classes.builderMenuButton} />
                    </IconButton>
                    <Fab color={"primary"} aria-label={"avatar snapshot"} className={classes.snapshot}>
                        <Camera />
                    </Fab>
                </Toolbar>
            </AppBar>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BuilderAppBar);