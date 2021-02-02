import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { LocalOffer, PersonAdd } from '@material-ui/icons';
import { Grid } from '@material-ui/core';



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

const NotLoggedItems: React.FC = () => {

  const classes = useStyles();

  return (
        <div>
          <Grid item xs={12}>
            <List component="nav" aria-label="account menu list">
              <Link to="/login" className={classes.listText} style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>
                    <LocalOffer />
                  </ListItemIcon>
                  <ListItemText primary="Log in" />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/register" className={classes.listText} style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>
                    <PersonAdd />
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>
              </Link>
            </List>
          </Grid>
          <Divider />
        </div>
  );
};

export default NotLoggedItems;