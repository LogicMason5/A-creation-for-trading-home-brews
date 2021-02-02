import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { AccountBox, ExitToApp, LocalOffer } from '@material-ui/icons';
import {  Grid, Container } from '@material-ui/core';
import { useAsyncDispatch } from '../store';
import { setDrawerOpen } from '../SharedComponents/displaySlice';
import { logout } from './userSlice';

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
  }),
);

const AccountMenu: React.FC = () => {

  const classes = useStyles();

  const dispatch = useAsyncDispatch();

  useEffect(() => {
    dispatch(setDrawerOpen(true));
  }, [dispatch]);

  const handleLogoutClick = () => {
    
    dispatch(logout());
  };


  return (
    <Container >
      <Grid container>
        <div className={classes.accountMenuRoot}>
          <Grid item xs={12}>
            <List component="nav" aria-label="account menu list">
              <Link to="/my-offers" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>
                    <LocalOffer />
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
              <Divider />
              <ListItem button onClick={handleLogoutClick}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </List>
          </Grid>
          <Divider />
        </div>
      </Grid>
    </Container>
  );
};

export default AccountMenu;