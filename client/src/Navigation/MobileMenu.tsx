import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import { AccountBox, LocalOffer } from '@material-ui/icons';
import { Button, Grid, Container } from '@material-ui/core';
import { useAsyncDispatch } from '../store';
import { setDrawerOpen } from './displaySlice';

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


  return (
    <Container >
      <Grid container>
        <div className={classes.accountMenuRoot}>
          <Grid item xs={12}>
            <List component="nav" aria-label="account menu list">
              <Link to="/placeholder" style={{ textDecoration: 'none' }}>
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
            </List>
          </Grid>
          <Divider />
          <Grid item className={classes.grow}/>
          <div className={classes.grow}></div>
          <Grid item xs={12} >
            <Button
              type="submit"
              variant="outlined"
              size="large"
              color="primary"
              fullWidth
            >
              Logout
            </Button>
          </Grid>
        </div>
      </Grid>
    </Container>
  );
};

export default AccountMenu;