import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Container, List } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useAsyncDispatch } from '../store';
import { setDrawerOpen } from './displaySlice';
import { RootState } from '../rootReducer';
import IsLoggedItems from './IsLoggedItems';
import NotLoggedItems from './NotLoggedItems';
import AlwaysShowItems from './AlwaysShowItems';

const useStyles = makeStyles((theme: Theme) => createStyles({
  mobileMenuRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const MobileMenu: React.FC = () => {
  const classes = useStyles();

  const dispatch = useAsyncDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(setDrawerOpen(true));
  }, [dispatch]);

  return (
    <Container className={classes.mobileMenuRoot}>
      <List>
        {
        isLoggedIn
          ? <IsLoggedItems />
          : <NotLoggedItems />
        }
        <AlwaysShowItems />
      </List>
    </Container>
  );
};

export default MobileMenu;
