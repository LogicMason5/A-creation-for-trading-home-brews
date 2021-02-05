import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { AccountBox, ExitToApp, LocalOffer } from '@material-ui/icons';
import { Container } from '@material-ui/core';
import { useAsyncDispatch } from '../store';
import { setDrawerOpen } from '../SharedComponents/displaySlice';
import { logout } from '../User/userSlice';
import MenuListItem from '../SharedComponents/MenuListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accountMenuContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    menuList: {
      width: '100%'
    }
  }),
);

const DesktopMenu: React.FC = () => {

  const classes = useStyles();

  const dispatch = useAsyncDispatch();

  useEffect(() => {
    dispatch(setDrawerOpen(true));
  }, [dispatch]);

  const handleLogoutClick = () => {
    dispatch(logout());
  };


  return (
    <Container className={classes.accountMenuContainer}>
        <div >
            <List component="nav" aria-label="account menu list" className={classes.menuList}>
              <MenuListItem
                itemText="My offers"
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
                onClick={handleLogoutClick}
                icon={<ExitToApp />}
              />
            </List>
        </div>
    </Container>
  );
};

export default DesktopMenu;