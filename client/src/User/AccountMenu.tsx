import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Hidden from '@material-ui/core/Hidden';
import { AccountBox } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accountMenuRoot: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    toolbarBuffer: theme.mixins.toolbar,
  }),
);

const AccountMenu: React.FC = () => {

  const classes = useStyles();

  return (
    <div className={classes.accountMenuRoot}>
      <Hidden mdUp>
        <div className={classes.toolbarBuffer} />
      </Hidden>

      <List component="nav" aria-label="account menu list">
        <Link to="/placeholder" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="My Offers" />
          </ListItem>
        </Link>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="Account details" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default AccountMenu;