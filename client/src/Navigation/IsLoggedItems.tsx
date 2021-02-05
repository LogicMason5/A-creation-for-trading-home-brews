import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { AccountBox, AddLocation, ExitToApp, LocalOffer } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logout } from '../User/userSlice';
import MenuListItem from '../SharedComponents/MenuListItem';



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
          <Grid item >
            <List component="nav" aria-label="account menu list">
              <MenuListItem
                itemText="Create an offer"
                linkTo="/create-offer"
                icon={<AddLocation />}
              />
              <MenuListItem
                itemText="My Offers"
                linkTo="/my-offers"
                icon={<LocalOffer />}
              />
              <MenuListItem
                itemText="Edit account"
                linkTo="/edit-account"
                icon={<AccountBox />}
              />
              <MenuListItem
                itemText="Log out"
                linkTo="/login"
                onClick={handleLogout}
                icon={<ExitToApp />}
              />
            </List>
          </Grid>
        </div>
  );
};

export default IsLoggedOptions;