import React from 'react';
import {
    Box,
} from '@material-ui/core';
import OverviewTab from './overview';
import ClosetTab from './closet';
import BaseTab from './base';
import FaceTab from './face/face';
import HairTab from './hair';
import TopsTab from './tops';
import BottomsTab from './bottoms';
import AccessoriesTab from './accessories';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        openPanel: state.openPanel.tab,
    }
};

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

function MenuPanels(props) {
    return (
        <>
            <TabPanel value={props.openPanel} index={0}>
                <OverviewTab />
            </TabPanel>
            <TabPanel value={props.openPanel} index={1}>
                <ClosetTab />
            </TabPanel>
            <TabPanel value={props.openPanel} index={2}>
                <BaseTab />
            </TabPanel>
            <TabPanel value={props.openPanel} index={3}>
                <FaceTab />
            </TabPanel>
            <TabPanel value={props.openPanel} index={4}>
                <HairTab />
            </TabPanel>
            <TabPanel value={props.openPanel} index={6}>
                <TopsTab />
            </TabPanel>
            <TabPanel value={props.openPanel} index={7}>
                <BottomsTab />
            </TabPanel>
            <TabPanel value={props.openPanel} index={9}>
                <AccessoriesTab />
            </TabPanel>
        </>
    )
}

export default connect(mapStateToProps)(MenuPanels);