import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import Hidden from '@material-ui/core/Hidden';
import { setDrawerOpen } from '../Display/displaySlice';
import { useAsyncDispatch } from '../store';
import TitleBox from '../SharedComponents/TitleBox';
import ChangePwForm from './ChangePwForm';

const useStyles = makeStyles((theme: Theme) => createStyles({
  toolbarBuffer: theme.mixins.toolbar,
}));

const EditAccount: React.FC = () => {
  const classes = useStyles();

  const dispatch = useAsyncDispatch();

  useEffect(() => {
    dispatch(setDrawerOpen(true));
  }, [dispatch]);

  return (
    <Container fixed>
      <Hidden mdUp>
        <div className={classes.toolbarBuffer} />
      </Hidden>
      <TitleBox title="Update account" />
      <ChangePwForm />
    </Container>
  );
};

export default EditAccount;
