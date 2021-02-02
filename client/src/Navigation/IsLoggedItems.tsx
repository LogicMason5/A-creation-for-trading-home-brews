import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { AccountBox, ExitToApp, LocalOffer } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logout } from '../User/userSlice';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accountMenuRoot: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    toolbarBuffer: theme.mixins.toolbar,
    grow: {
      flexGrow: 1,
      display: 'flex',
    },
    listText: {
      color: theme.palette.text.primary,
    }
  }),
);

const IsLoggedOptions: React.FC = () => {

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
        <div className={classes.accountMenuRoot}>
          <Grid item xs={12}>
            <List component="nav" aria-label="account menu list">
              <Link to="/my-offers" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>
                    <LocalOffer />
                  </ListItemIcon>
                  <ListItemText primary="My Offers" className={classes.listText}/>
                </ListItem>
              </Link>
              <Divider />
              <Link to="/my-account" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>
                    <AccountBox />
                  </ListItemIcon>
                  <ListItemText primary="Account details" className={classes.listText}/>
                </ListItem>
              </Link>
              <Divider />
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="Log out" className={classes.listText}/>
                </ListItem>
            </List>
          </Grid>
        </div>
  );
};

export default IsLoggedOptions;