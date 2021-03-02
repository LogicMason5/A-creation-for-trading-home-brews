import React, { useEffect } from 'react';
import {
  Button, Container, Grid, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TitleBox from '../SharedComponents/TitleBox';
import { setDrawerOpen } from './displaySlice';

const MustBeLogged: React.FC<{ reason: string }> = ({ reason }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDrawerOpen(true));
    return () => {
      dispatch(setDrawerOpen(false));
    };
  }, [dispatch]);

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TitleBox title="Login required" />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            You must be logged in
            {' '}
            {reason}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              fullWidth
            >
              Sign in
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              fullWidth
            >
              Register
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MustBeLogged;
