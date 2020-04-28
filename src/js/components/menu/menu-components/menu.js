import React, {useState } from 'react';
import { 
    Tab,
    Tabs,
    Box,
    Grid,
    Typography,
    makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import OverviewTab from '../../menu-panels/overview';

const builderMenuItems = require('./builder-menu-items.json');

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
                    <Typography>{children}</Typography>
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

function a11yProps(index) {
  return {
    id: `builder-tab-${index}`,
    'aria-controls': `builder-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function BuilderMenu(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
        <Grid container spacing={2}>
            <Grid item md={2} lg={2}>
                <Tabs
                    orientation={'vertical'}
                    variant={"standard"}
                    value={value}
                    onChange={handleChange}
                    aria-label="Avatar Builder Menu"
                    className={classes.tabs}
                    >
                    {
                    builderMenuItems.map((item) => 
                        <Tab key={item.id} label={item.title} {...a11yProps(item.id)} />
                        )
                    }
                </Tabs>
            </Grid>
            <Grid item md={5} lg={5}>
                {props.children}
            </Grid>
            <Grid item md={5} lg={5}>
                <TabPanel value={value} index={0}>
                    <OverviewTab />
                </TabPanel>
            </Grid>
        </Grid>
        </div>
    )
}

export default BuilderMenu;