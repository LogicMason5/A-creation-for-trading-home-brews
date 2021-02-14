import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useAsyncDispatch } from '../../store';
import { fetchMyOffers } from '../offerSlice';
import { RootState } from '../../rootReducer';
import OffersListCard from './MyOffersListCard';
import { setDrawerOpen } from '../../Navigation/displaySlice';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    myOffersListContainer: {
      justify: "center"
    },
  }),
);

const MyOffersList: React.FC = () => {

  const classes = useStyles();

  const dispatch = useAsyncDispatch();

  const myOffers = useSelector(
    (state: RootState) => state.offers.myOffers
  );

  useEffect(() => {
    dispatch(fetchMyOffers());
  }, [dispatch]); 

  useEffect(() => {
    dispatch(setDrawerOpen(true));
  }, [dispatch]);

  return (
    <Container className={classes.myOffersListContainer}>
      <Grid 
        container
        spacing={2}
        justify="center"
      >
          {myOffers.length > 0
          ?
          myOffers.map(o => <OffersListCard key={o.id} offer={o}  />)
          :
          <Typography
            align="center"
            variant="h4"
            style={{ lineHeight: 1.25 }}
            >
            No offers found. Create one a new offer?
          </Typography>}
      </Grid>
    </Container>
  );

};

export default MyOffersList;