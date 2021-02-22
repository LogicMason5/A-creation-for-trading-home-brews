import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import { useAsyncDispatch } from '../store';
import { setDrawerOpen } from './displaySlice';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import IsLoggedItems from './IsLoggedItems';
import NotLoggedItems from './NotLoggedItems';
import AlwaysShowItems from './AlwaysShowItems';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mobileMenuRoot: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const MobileMenu: React.FC = () => {

  const classes = useStyles();

  const dispatch = useAsyncDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(setDrawerOpen(true));
  }, [dispatch]);


  return (
    <Container className={classes.mobileMenuRoot}>
      <Grid container>
        {
        isLoggedIn
        ? 
        <IsLoggedItems />
        :
        <NotLoggedItems />  
        }
        <AlwaysShowItems />
      </Grid>
    </Container>
  );
};

export default MobileMenu;