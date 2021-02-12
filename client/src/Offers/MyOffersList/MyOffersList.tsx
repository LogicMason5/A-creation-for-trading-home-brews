import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useAsyncDispatch } from '../../store';
import { fetchMyOffers } from '../offerSlice';
import { RootState } from '../../rootReducer';
import OffersListCard from './MyOffersListCard';
import { setDrawerOpen } from '../../SharedComponents/displaySlice';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() =>
  createStyles({
    myOffersListContainer: {
      padding: "10px",
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
    <Grid 
      container
      spacing={4}
      justify="center"
      className={classes.myOffersListContainer}>
        {myOffers.length > 0
        ?
        myOffers.map(o => <OffersListCard key={o.id} offer={o}  />)
        :
        <Typography
          align="center"
          variant="h4"
          style={{ lineHeight: 1.25 }}
          >
          Loading your offers...
        </Typography>}
    </Grid>
  );

};

export default MyOffersList;