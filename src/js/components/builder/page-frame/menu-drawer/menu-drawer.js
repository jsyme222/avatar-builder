import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { setSidebarOpen, setPanel } from '../../../../redux/actions/index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        sidebarOpen: state.sidebarOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSidebarOpen: action => dispatch(setSidebarOpen(action)),
        setPanel: panel => dispatch(setPanel({tab: panel})),
    }
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function MenuDrawer(props) {
  const classes = useStyles();
  const menuItems = require('./builder-menu-items.json');

  const toggleDrawer = (open) => (event) => {
    props.setSidebarOpen(open);
  };

  const handleMenuClick = (panel) => {
    props.setPanel(panel);
    props.setSidebarOpen(false);
  }

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => props.setSidebarOpen(false)}
      onKeyDown={() => props.setSidebarOpen(false)}
    >
      
      <List>
        {menuItems.map((text) => (
          <ListItem button key={text.id} onClick={() => handleMenuClick(text.id)}>
            <ListItemText primary={text.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
          <SwipeableDrawer
            anchor={"left"}
            open={props.sidebarOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);