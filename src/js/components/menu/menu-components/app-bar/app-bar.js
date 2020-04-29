import React, { useState } from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar,
    IconButton,
    Fab,
    Menu,
    MenuItem,
    Grow,
} from '@material-ui/core';
import {
    Camera,
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { setSidebarOpen, setPanel } from '../../../../redux/actions/index';
import { connect } from 'react-redux';

const builderMenuItems = require('../../builder-menu-items.json');

const mapStateToProps = state => {
    return {
        sidebarOpen: state.sidebarOpen,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setSidebarOpen: action => dispatch(setSidebarOpen(action)),
        setPanel: panel => dispatch(setPanel(panel)),
    }
};


function a11yProps(index) {
    return {
      id: `builder-tab-${index}`,
      'aria-controls': `builder-tabpanel-${index}`,
    };
  }

function BuilderAppBar(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const useStyles = makeStyles((theme) => ({
        root: {

        },
        appBar: {
          top: 'auto',
          bottom: 0,
          '@media(max-width: 960px)': {
              marginTop: 20,
          }
        },
        builderMenuContainer: {
            // '@media(min-width: 959px)': {
            //     display: 'none',
            // }
        },
        snapshot: {
            position: 'absolute',
            zIndex: 1,
            top: -30,
            left: 0,
            right: 0,
            margin: '0 auto',
          },
    }));
    
    const classes = useStyles();

    const handleMenuClick = (event) => {
        setAnchorEl(document.querySelector("#avatar-container"));
    };
    const handleMenuClose = (event) => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (value, title) => {
        setAnchorEl(null);
        props.setPanel({tab: value, title: title})
    };

    return (
        <>
            <div className={classes.builderMenuContainer}>
                        <Menu
                            id={"builder-menu"}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            aria-label="Avatar Builder Menu"
                            TransitionComponent={Grow}
                            >
                            {
                                builderMenuItems.map((item) => 
                                    <MenuItem key={item.id} onClick={() => handleMenuItemClick(item.id, item.title)} {...a11yProps(item.id)} > {item.title} </MenuItem>
                                    )
                            }
                        </Menu>
            </div>
            <AppBar position="static" color={"secondary"} className={classes.appBar}>
                <Toolbar>
                    <IconButton 
                        edge={"start"} 
                        color={"primary"} 
                        aria-label={"open builder menu"} 
                        onClick={handleMenuClick}
                    >
                        <MenuIcon className={classes.builderMenuButton} />
                    </IconButton>
                    <Fab color={"primary"} aria-label={"avatar snapshot"} className={classes.snapshot}>
                        <Camera />
                    </Fab>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BuilderAppBar);