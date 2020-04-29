import React, {useState, useEffect } from 'react';
import { 
    Box,
    Grid,
    makeStyles,
    Slide,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import OverviewTab from '../../menu-panels/overview';
import ClosetTab from '../../menu-panels/closet';
import BaseTab from '../../menu-panels/base';
import { setSidebarOpen, setPanel } from '../../../redux/actions/index';
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role={'tabpanel'}
            hidden={value !== index}
            id={`builder-tabpanel-${index}`}
            aria-labelledby={`builder-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function PageFrame(props) {
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
      },
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {props.children}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TabPanel value={props.openPanel} index={0}>
                        <OverviewTab />
                    </TabPanel>
                    <TabPanel value={props.openPanel} index={1}>
                        <ClosetTab />
                    </TabPanel>
                    <TabPanel value={props.openPanel} index={2}>
                        <BaseTab />
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PageFrame);